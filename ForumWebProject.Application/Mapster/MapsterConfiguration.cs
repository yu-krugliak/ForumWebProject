using ForumWebProject.Application.Models;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Identity;
using Mapster;
using Microsoft.Extensions.DependencyInjection;

namespace ForumWebProject.Application.Mapster;

public static class MapsterConfiguration
{
    public static IServiceCollection AddMapsterConfiguration(this IServiceCollection services)
    {
        var config = new TypeAdapterConfig();

        config.ForType<Category, CategoryView>()
            .IgnoreNullValues(false);
        
        config.ForType<CategoryRequest, Category>()
            .IgnoreNullValues(true);

        config.ForType<Topic, TopicView>()
            .IgnoreNullValues(false);
        
        config.ForType<TopicRequest, Topic>()
            .IgnoreNullValues(true);
        
        config.ForType<Role, RoleView>()
            .IgnoreNullValues(false);

        config.ForType<Permission, PermissionView>()
            .IgnoreNullValues(false);

        config.ForType<Role, RoleView>()
            .IgnoreNullValues(false);

        return services.AddSingleton(config);
    }
}