using ForumWebProject.Infrastructure.Identity;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using ForumWebProject.Shared.Authorization.Permissions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ForumWebProject.Infrastructure.Initialization.Seeders;

public class RoleSeeder : ICustomSeeder
{
    private readonly RoleManager<Role> _roleManager;
    private readonly IPermissionRepository _permissionRepository;

    public RoleSeeder(RoleManager<Role> roleManager, IPermissionRepository permissionRepository)
    {
        _roleManager = roleManager;
        _permissionRepository = permissionRepository;
    }

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        await AddRoleWithPermissionsAsync(new Role(ForumRoles.Admin, "Admin"), ForumPermissions.Admin, cancellationToken);
        await AddRoleWithPermissionsAsync(new Role(ForumRoles.User, "User"), ForumPermissions.User, cancellationToken);
    }

    private async Task AddRoleWithPermissionsAsync(Role roleToAdd, IReadOnlyCollection<ForumPermission> permissions, CancellationToken cancellationToken)
    {
        if (await _roleManager.Roles.SingleOrDefaultAsync(r => r.Name == roleToAdd.Name, cancellationToken) is not Role
            role)
        {
            role = roleToAdd;
            var result = await _roleManager.CreateAsync(role);
        }

        var permissionsFromRole = (await _permissionRepository.GetByRoleIdAsync(role.Id, cancellationToken)).ToList();
        foreach (var permission in permissions)
        {
            var permissionName = ForumPermission.ToName(permission.Action, permission.Resource);

            if (permissionsFromRole.Any(p => p.Name == permissionName))
            {
                continue;
            }

            if (await _permissionRepository.GetByNameAsync(permissionName, cancellationToken) is not Permission
                existingPermission)
            {
                existingPermission = await _permissionRepository.AddAsync(new Permission()
                {
                  Name = permissionName,
                  Description = permission.Description
                });
            }

            await _permissionRepository.GrantToRole(existingPermission.Id, role.Id, cancellationToken);
        }
    }
}