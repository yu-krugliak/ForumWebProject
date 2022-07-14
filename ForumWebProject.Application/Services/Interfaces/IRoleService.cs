using ForumWebProject.Application.Models;
using ForumWebProject.Application.Models.Requests;
using ForumWebProject.Application.Models.Views;

namespace ForumWebProject.Application.Services.Interfaces;

public interface IRoleService
{
    Task<RoleView> AddRoleAsync(RoleRequest roleRequest);
    Task<IEnumerable<RoleView>> GetAllAsync();
    Task<RoleView> GetByIdAsync(Guid id);
}