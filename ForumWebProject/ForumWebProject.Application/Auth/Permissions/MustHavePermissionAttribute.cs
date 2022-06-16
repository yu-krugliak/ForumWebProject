using Microsoft.AspNetCore.Authorization;

namespace ForumWebProject.Application.Auth.Permissions;

public class MustHavePermissionAttribute : AuthorizeAttribute
{
    public MustHavePermissionAttribute(string action, string resource)
    {
        Policy = $"Permission.{resource}.{action}";
    }
}