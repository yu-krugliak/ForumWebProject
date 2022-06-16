using ForumWebProject.Application.Models;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Infrastructure.Identity;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using ForumWebProject.Shared.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ForumWebProject.Application.Services.Implementations;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<Role> _roleManager;
    private readonly IRoleClaimRepository _roleClaimRepository;

    public UserService(UserManager<User> userManager, RoleManager<Role> roleManager, IRoleClaimRepository roleClaimRepository)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _roleClaimRepository = roleClaimRepository;
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
            var claimsByRoleId = await _roleClaimRepository.GetByRoleIdAsync(role.Id, cancellationToken);
            permissions.AddRange(claimsByRoleId.Where(rc => rc.ClaimType == ForumClaims.Permission).Select(rc => rc.ClaimValue).ToList());
        }

        return permissions.Distinct().ToList();
    }

    public async Task<bool> HasPermission(string userId, string permission, CancellationToken cancellationToken = default)
    {
        var permissions = await GetPermissionsAsync(userId, cancellationToken);
        return permissions.Contains(permission);
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
}