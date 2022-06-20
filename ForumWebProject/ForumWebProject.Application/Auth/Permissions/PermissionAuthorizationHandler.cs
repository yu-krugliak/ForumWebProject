using ForumWebProject.Application.Auth.Extentions;
using ForumWebProject.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace ForumWebProject.Application.Auth.Permissions;

public class PermissionAuthorizationHandler : AuthorizationHandler<AuthorizationRequirement>
{
    private readonly IUserService _userService;

    public PermissionAuthorizationHandler(IUserService userService)
    {
        _userService = userService;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, AuthorizationRequirement requirement)
    {
        if (context.User?.GetUserId() is { } userId && await _userService.HasPermissionAsync(userId, requirement.Permission))
        {
            context.Succeed(requirement);
        }
    }
}