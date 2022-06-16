using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace ForumWebProject.Application.Auth.Jwt;

public static class Startup
{
    public static IServiceCollection AddJwtAuth(this IServiceCollection services)
    {
        services.AddOptions<JwtSettings>()
            .BindConfiguration(nameof(JwtSettings))
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.AddSingleton<IConfigureOptions<JwtBearerOptions>, ConfigureJwtBearerOptions>();

        return services
            .AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, null)
            .Services;
    }
}