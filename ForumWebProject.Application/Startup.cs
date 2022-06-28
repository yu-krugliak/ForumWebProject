using FluentValidation;
using ForumWebProject.Application.Auth;
using ForumWebProject.Application.Auth.Jwt;
using ForumWebProject.Application.Auth.Permissions;
using ForumWebProject.Application.Mapster;
using ForumWebProject.Application.Middleware;
using ForumWebProject.Application.Models.Validators;
using ForumWebProject.Application.Services.Implementations;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Identity;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace ForumWebProject.Application;

public static class Startup
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services
            .AddServices()
            .AddCurrentUser()
            .AddPermissions()
            .AddIdentity()
            .AddJwtAuth()
            .AddTransient<ExceptionHandlingMiddleware>()
            .AddMapster()
            .AddValidatorsFromAssemblyContaining<CategoryRequestValidator>();
    }

    public static IApplicationBuilder UseApplication(this IApplicationBuilder builder)
    {
        return builder
            .UseMiddleware<ExceptionHandlingMiddleware>()
            .UseAuthentication()
            .UseAuthorization()
            .UseCurrentUser();
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        return services
            .AddTransient<ICategoryService, CategoryService>()
            .AddTransient<ITopicService, TopicService>()
            .AddTransient<IPostService, PostService>()
            .AddTransient<IUserService, UserService>()
            .AddTransient<ITokenService, TokenService>()
            .AddTransient<IRoleService, RoleService>()
            .AddTransient<IPermissionService, PermissionService>();
    }

    public static IServiceCollection AddIdentity(this IServiceCollection services)
    {
        return services.AddIdentity<User, Role>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<ForumContext>()
            .AddDefaultTokenProviders()
            .Services;
    }

    public static IServiceCollection AddPermissions(this IServiceCollection services)
    {
        return services
            .AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>()
            .AddScoped<IAuthorizationHandler, PermissionAuthorizationHandler>();
    }

    public static IServiceCollection AddMapster(this IServiceCollection services)
    {
        return services
            .AddMapsterConfiguration()
            .AddTransient<IMapper, ServiceMapper>();
    }
}