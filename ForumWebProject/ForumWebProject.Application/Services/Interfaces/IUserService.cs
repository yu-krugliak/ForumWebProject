using ForumWebProject.Application.Models;

namespace ForumWebProject.Application.Services.Interfaces;

public interface IUserService
{
    Task<List<string>> GetPermissionsAsync(string userId, CancellationToken cancellationToken = default);
    Task<bool> HasPermission(string userId, string permission, CancellationToken cancellationToken = default);
    Task RegisterAsync(RegisterRequest request);
}