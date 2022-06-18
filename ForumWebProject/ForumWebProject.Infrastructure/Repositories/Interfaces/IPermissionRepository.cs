using ForumWebProject.Infrastructure.Identity;

namespace ForumWebProject.Infrastructure.Repositories.Interfaces;

public interface IPermissionRepository : IRepository<Permission>
{
    Task<IEnumerable<Permission>> GetByRoleIdAsync(Guid roleId, CancellationToken cancellationToken);
    Task<Permission?> GetByNameAsync(string name, CancellationToken cancellationToken);
    Task GrantToRole(Guid permissionId, Guid roleId, CancellationToken cancellationToken);
    Task RevokeFromRole(Guid permissionId, Guid roleId, CancellationToken cancellationToken);
}