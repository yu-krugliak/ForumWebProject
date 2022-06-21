using ForumWebProject.Shared.Authorization.Permissions;
using Microsoft.AspNetCore.Authorization;

namespace ForumWebProject.Application.Auth.Permissions;

public class MustHavePermissionAttribute : AuthorizeAttribute
{
    public MustHavePermissionAttribute(string action, string resource)
    {
        Policy = ForumPermission.ToName(action, resource);
    }
}