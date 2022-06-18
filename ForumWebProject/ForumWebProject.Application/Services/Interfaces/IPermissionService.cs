using ForumWebProject.Application.Models;

namespace ForumWebProject.Application.Services.Interfaces;

public interface IPermissionService
{
    Task<IEnumerable<PermissionView>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<PermissionView> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task GrantToRole(Guid permissionId, Guid roleId, CancellationToken cancellationToken = default);
    Task RevokeFromRole(Guid permissionId, Guid roleId, CancellationToken cancellationToken = default);
}