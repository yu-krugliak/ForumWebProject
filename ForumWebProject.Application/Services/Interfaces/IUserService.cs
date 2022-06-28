using ForumWebProject.Application.Models;
using ForumWebProject.Infrastructure.Identity;

namespace ForumWebProject.Application.Services.Interfaces;

public interface IUserService
{
    Task<List<string>> GetPermissionsAsync(string userId, CancellationToken cancellationToken = default);
    Task<bool> HasPermissionAsync(string userId, string permission, CancellationToken cancellationToken = default);
    Task<IEnumerable<string>> GetCurrentUserPermissions(CancellationToken cancellationToken = default);
    Task RegisterAsync(RegisterRequest request);
    Task AddRoleAsync(string userId, string roleId);
    Task RemoveRoleAsync(string userId, string roleId);
}