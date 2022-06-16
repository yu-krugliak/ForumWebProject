using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Identity;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ForumWebProject.Infrastructure.Repositories.Implementations;

public class RoleClaimRepository : RepositoryBase<RoleClaim>, IRoleClaimRepository
{
    private readonly ForumContext _forumContext;

    public RoleClaimRepository(ForumContext forumContext) : base(forumContext)
    {
        _forumContext = forumContext;
    }

    public async Task<IEnumerable<RoleClaim>> GetByRoleIdAsync(Guid roleId, CancellationToken cancellationToken)
    {
        return await _forumContext.RoleClaims.Where(rc => rc.RoleId == roleId).ToListAsync(cancellationToken);
    }
}