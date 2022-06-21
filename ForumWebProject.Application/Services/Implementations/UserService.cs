using System.Net;
using ForumWebProject.Application.Exceptions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Infrastructure.Identity;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ForumWebProject.Application.Services.Implementations;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<Role> _roleManager;
    private readonly IPermissionRepository _permissionRepository;

    public UserService(UserManager<User> userManager, RoleManager<Role> roleManager, IPermissionRepository permissionRepository) 
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _permissionRepository = permissionRepository;
    }

    public async Task<List<string>> GetPermissionsAsync(string userId, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(userId)
            ?? throw new UnauthorizedAccessException("Authentication failed.");

        var userRoles = await _userManager.GetRolesAsync(user);
        var roles = await _roleManager.Roles.Where(r => userRoles.Contains(r.Name)).ToListAsync(cancellationToken);

        var permissions = new List<string>();
        foreach (var role in roles)
        {
            var permissionsByRoleId = await _permissionRepository.GetByRoleIdAsync(role.Id, cancellationToken);
            permissions.AddRange(permissionsByRoleId.Select(p => p.Name!).ToList());
        }

        return permissions.Distinct().ToList();
    }

    public async Task<bool> HasPermissionAsync(string userId, string permission, CancellationToken cancellationToken = default)
    {
        var permissions = await GetPermissionsAsync(userId, cancellationToken);
        return permissions.Contains(permission);
    }

    public async Task AddRoleAsync(string userId, string roleId)
    {
        var user = await FindUserByIdAsync(userId);
        var role = await FindRoleByIdAsync(roleId);
        var userRoles = await _userManager.GetRolesAsync(user);

        if (userRoles.Contains(role.Name))
        {
            throw new CustomException("Role already exists for with user", null, HttpStatusCode.BadRequest);
        }

        var result = await _userManager.AddToRoleAsync(user, role.Name);

        if (!result.Succeeded)
        {
            throw new IdentityException("Unable to add role to user.", result);
        }
    }

    public async Task RemoveRoleAsync(string userId, string roleId)
    {
        var user = await FindUserByIdAsync(userId);
        var role = await FindRoleByIdAsync(roleId);
        var userRoles = await _userManager.GetRolesAsync(user);

        if (!userRoles.Contains(role.Name))
        {
            throw new CustomException("Role doesn't belong to this user.", null, HttpStatusCode.BadRequest);
        }

        var result = await _userManager.RemoveFromRoleAsync(user, role.Name);

        if (!result.Succeeded)
        {
            throw new IdentityException("Unable to remove role of user.", result);
        }
    }

    public async Task RegisterAsync(RegisterRequest request)
    {
        var user = new User()
        {
            Email = request.Email,
            UserName = request.UserName,
            FirstName = request.FirstName
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            //TODO: Proper exception
            throw new NotImplementedException(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description).ToArray()));
        }

        await _userManager.AddToRoleAsync(user, ForumRoles.User);
    }

    private async Task<Role?> FindRoleByIdAsync(string roleId)
    {
        var role = await _roleManager.FindByIdAsync(roleId);
        if (role is null)
        {
            throw new NotFoundException("Role with such id not found.");
        }

        return role;
    }

    private async Task<User> FindUserByIdAsync(string userId)
    {
        return await _userManager.FindByIdAsync(userId)
               ?? throw new NotFoundException("User with such Id not found.");
    }
}