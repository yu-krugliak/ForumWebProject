using ForumWebProject.Application.Models;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Identity;
using Mapster;
using Microsoft.Extensions.DependencyInjection;

namespace ForumWebProject.Application.Mapster;

public static class MapsterConfiguration
{
    public static TypeAdapterConfig GetConfiguration()
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
        
        config.ForType<Post, PostView>()
            .Map(pv => pv.UserFirstName, p => p.User.FirstName)
            .Map(pv => pv.UserLastName, p => p.User.LastName)
            .Map(pv => pv.UserRegistrationDate, p => p.User.RegistrationDate)
            .Map(pv => pv.UserName, p => p.User.UserName)
            .Map(pv => pv.ReplyToPostId, p => p.ReplyToPostId)
            .Map(pv => pv.ReplyTo, p => p.ReplyToPost)
            .IgnoreNullValues(false);
        
        config.ForType<PostRequest, Post>()
            .Map(p => p.ReplyToPostId, pr => pr.ReplyToPostId)
            .IgnoreNullValues(true);
        
        config.ForType<Role, RoleView>()
            .IgnoreNullValues(false);

        config.ForType<Permission, PermissionView>()
            .IgnoreNullValues(false);

        config.ForType<Role, RoleView>()
            .IgnoreNullValues(false);

        return config;
    }
    
    public static IServiceCollection AddMapsterConfiguration(this IServiceCollection services)
    {
        var config = GetConfiguration();
        return services.AddSingleton(config);
    }
    
    
}