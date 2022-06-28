using System.Security.Claims;
using ForumWebProject.Application.Exceptions;

namespace ForumWebProject.Application.Auth;

public class CurrentUser : ICurrentUser
{
    private ClaimsPrincipal? _user;

    public void SetUser(ClaimsPrincipal user)
    {
        _user = user;
    }

    public string GetUserId()
    {
        var userNameClaim = _user?.FindFirst(ClaimTypes.NameIdentifier);
        if (userNameClaim is null)
        {
            throw new UnauthorizedException("User not authorized");
        }
        
        return userNameClaim.Value;
    }

    public string GetUserRole()
    {
        throw new NotImplementedException();
    }
}