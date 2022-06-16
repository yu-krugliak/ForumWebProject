using ForumWebProject.Infrastructure.Identity;

namespace ForumWebProject.Infrastructure.Repositories.Interfaces;

public interface IRoleClaimRepository : IRepository<RoleClaim>
{
    Task<IEnumerable<RoleClaim>> GetByRoleIdAsync(Guid roleId, CancellationToken cancellationToken);
}