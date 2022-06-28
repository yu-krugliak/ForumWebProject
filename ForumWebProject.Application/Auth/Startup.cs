using ForumWebProject.Application.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ForumWebProject.Application.Auth;

public static class Startup
{
    
    public static IServiceCollection AddCurrentUser(this IServiceCollection services)
    {
        return services
            .AddScoped<CurrentUserMiddleware>()
            .AddScoped<ICurrentUser, CurrentUser>();
    }
    
    public static IApplicationBuilder UseCurrentUser(this IApplicationBuilder builder)
    {
        return builder
            .UseMiddleware<CurrentUserMiddleware>();
    }
}