using System.Security.Claims;

namespace ForumWebProject.Application.Auth;

public interface ICurrentUser
{
    void SetUser(ClaimsPrincipal user);
    string GetUserId();
    string GetUserRole();
}