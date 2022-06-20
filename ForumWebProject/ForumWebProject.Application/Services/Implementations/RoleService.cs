using System.Net;
using ForumWebProject.Application.Exceptions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Infrastructure.Identity;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ForumWebProject.Application.Services.Implementations;

public class RoleService : IRoleService
{
    private readonly RoleManager<Role> _roleManager;

    public RoleService(RoleManager<Role> roleManager)
    {
        _roleManager = roleManager;
    }

    public async Task<RoleView> AddRoleAsync(RoleRequest roleRequest)
    {
        if (await _roleManager.Roles.FirstOrDefaultAsync(r => r.Name == roleRequest.Name) is not null)
        {
            throw new CustomException("Role already exists", null, HttpStatusCode.BadRequest);
        }

        var role = new Role(roleRequest.Name, roleRequest.Description);
        var result = await _roleManager.CreateAsync(role);

        if (!result.Succeeded)
        {
            throw new ServerErrorException("Error adding new role", result.Errors.Select(e => e.Description).ToList());
        }

        return role.Adapt<RoleView>();
    }

    public async Task<IEnumerable<RoleView>> GetAllAsync()
    {
        var roles = await _roleManager.Roles.ToListAsync();
        return roles.Adapt<IEnumerable<RoleView>>();
    }

    public async Task<RoleView> GetByIdAsync(Guid id)
    {
        var role = await _roleManager.Roles.FirstOrDefaultAsync(r => r.Id == id);
        if (role is null)
        {
            throw new NotFoundException($"Role with id {id} not found.");
        }

        return role.Adapt<RoleView>();
    }
}