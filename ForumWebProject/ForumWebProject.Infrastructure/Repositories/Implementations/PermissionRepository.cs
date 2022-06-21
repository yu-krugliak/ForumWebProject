using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Identity;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ForumWebProject.Infrastructure.Repositories.Implementations;

public class PermissionRepository : RepositoryBase<Permission>, IPermissionRepository
{
    private readonly ForumContext _forumContext;

    public PermissionRepository(ForumContext forumContext) : base(forumContext)
    {
        _forumContext = forumContext;
    }

    public async Task<IEnumerable<Permission>> GetByRoleIdAsync(Guid roleId, CancellationToken cancellationToken)
    {
        return await _forumContext.Permissions
            .Where(rc => rc.RolePermissions!.Any(r => r.RoleId == roleId))
            .ToListAsync(cancellationToken);
    }

    public async Task<Permission?> GetByNameAsync(string name, CancellationToken cancellationToken)
    {
        return await _forumContext.Permissions.FirstOrDefaultAsync(p => p.Name == name, cancellationToken);
    }

    public async Task GrantToRole(Guid permissionId, Guid roleId, CancellationToken cancellationToken)
    {
        if (await _forumContext.RolePermissions.FindAsync(roleId, permissionId) is not null)
        {
            return;
        }

        await _forumContext.RolePermissions.AddAsync(new RolePermission()
            { RoleId = roleId, PermissionId = permissionId }, cancellationToken);
        await _forumContext.SaveChangesAsync(cancellationToken);
    }

    public async Task RevokeFromRole(Guid permissionId, Guid roleId, CancellationToken cancellationToken)
    {
        var permission =
            await _forumContext.RolePermissions.FindAsync(new object?[] { roleId, permissionId }, cancellationToken);
        if (permission is null)
        {
            return;
        }

        _forumContext.RolePermissions.Remove(permission);
        await _forumContext.SaveChangesAsync(cancellationToken);
    }
}