using ForumWebProject.Infrastructure.Identity;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using ForumWebProject.Shared.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ForumWebProject.Infrastructure.Initialization.Seeders;

public class RoleSeeder : ICustomSeeder
{
    private readonly RoleManager<Role> _roleManager;
    private readonly IRoleClaimRepository _roleClaimRepository;

    public RoleSeeder(RoleManager<Role> roleManager, IRoleClaimRepository roleClaimRepository)
    {
        _roleManager = roleManager;
        _roleClaimRepository = roleClaimRepository;
    }

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        foreach (var roleName in ForumRoles.DefaultRoles)
        {
            if (await _roleManager.Roles.SingleOrDefaultAsync(r => r.Name == roleName, cancellationToken) is not Role role)
            {
                role = new Role(roleName, $"{roleName} role.");
                var result = await _roleManager.CreateAsync(role);
            }

            var tempPermission = "Permission.Categories.Read";

            var roleClaims = await _roleManager.GetClaimsAsync(role);
            if (!roleClaims.Any(rc => rc.Type == ForumClaims.Permission && rc.Value == tempPermission))
            {
                await _roleClaimRepository.AddAsync(new RoleClaim()
                {
                    RoleId = role.Id,
                    ClaimType = ForumClaims.Permission,
                    ClaimValue = tempPermission
                });
            }
        }
    }
}