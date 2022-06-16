using ForumWebProject.Shared.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace ForumWebProject.Application.Auth.Permissions;

public class PermissionPolicyProvider : IAuthorizationPolicyProvider
{
    public DefaultAuthorizationPolicyProvider FallbackPolicyProvider { get; }

    public PermissionPolicyProvider(IOptions<AuthorizationOptions> options)
    {
        FallbackPolicyProvider = new DefaultAuthorizationPolicyProvider(options);
    }

    public async Task<AuthorizationPolicy> GetDefaultPolicyAsync()
    {
        return await FallbackPolicyProvider.GetDefaultPolicyAsync();
    }

    public Task<AuthorizationPolicy?> GetFallbackPolicyAsync()
    {
        return Task.FromResult<AuthorizationPolicy?>(null);
    }

    public Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
    {
        if (!policyName.StartsWith(ForumClaims.Permission, StringComparison.OrdinalIgnoreCase))
        {
            return FallbackPolicyProvider.GetPolicyAsync(policyName);
        }

        var policy = new AuthorizationPolicyBuilder();
        policy.AddRequirements(new AuthorizationRequirement(policyName));
        return Task.FromResult<AuthorizationPolicy?>(policy.Build());
    }
}