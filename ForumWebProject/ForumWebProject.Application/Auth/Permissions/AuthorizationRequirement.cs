using Microsoft.AspNetCore.Authorization;

namespace ForumWebProject.Application.Auth.Permissions;

public class AuthorizationRequirement : IAuthorizationRequirement
{
    public string  Permission { get; set; }

    public AuthorizationRequirement(string permission)
    {
        Permission = permission;
    }
}