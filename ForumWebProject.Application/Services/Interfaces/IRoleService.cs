using ForumWebProject.Application.Models;

namespace ForumWebProject.Application.Services.Interfaces;

public interface IRoleService
{
    Task<RoleView> AddRoleAsync(RoleRequest roleRequest);
    Task<IEnumerable<RoleView>> GetAllAsync();
    Task<RoleView> GetByIdAsync(Guid id);
}