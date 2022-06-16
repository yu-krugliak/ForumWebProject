using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Initialization;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ForumWebProject.Infrastructure;

public static class Startup
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
    {
        return services.AddDbContext<ForumContext>((provider, options) =>
            {
                var connectionString =
                    configuration.GetConnectionString("DbConnection" /*TODO: Constant name prop in model*/);
                options.UseNpgsql(connectionString).UseLazyLoadingProxies();
            })
            .AddTransient<ForumContextSeeder>()
            .AddServices(typeof(ICustomSeeder), ServiceLifetime.Transient)
            .AddTransient<SeederRunner>()
            .AddRepositories();
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        var exportedTypes = typeof(IRepository<>).Assembly.GetExportedTypes();
        var repositoriesInterfacesTypes = exportedTypes
            .Where(t => t.IsInterface && t.FindInterfaces((type, criteria) => type.IsGenericType && type.GetGenericTypeDefinition() == typeof(IRepository<>), null).Any())
            .ToList();

        foreach (var repositoryInterface in repositoriesInterfacesTypes)
        {
            var repositoryImplementation = typeof(IRepository<>).Assembly.GetExportedTypes()
                .FirstOrDefault(i => repositoryInterface.IsAssignableFrom(i) && i.IsClass);

            if(repositoryImplementation is null)
                continue;

            services.AddTransient(repositoryInterface, repositoryImplementation);
        }

        return services;
    }

    public static async Task InitializeDatabaseAsync(this IServiceProvider serviceProvider,
        CancellationToken cancellationToken = default)
    {
        await using var scope = serviceProvider.CreateAsyncScope();

        await scope.ServiceProvider.GetRequiredService<ForumContextSeeder>()
            .SeedDatabaseAsync(cancellationToken);
    }

    private static IServiceCollection AddServices(this IServiceCollection services, Type interfaceType,
        ServiceLifetime lifeTime)
    {
        var interfaceTypes = AppDomain.CurrentDomain.GetAssemblies()
            .SelectMany(s => s.GetTypes())
            .Where(t => interfaceType.IsAssignableFrom(t) && t.IsClass && !t.IsAbstract)
            .Select(t => new
            {
                Service = t.GetInterfaces().FirstOrDefault(),
                Implementation = t
            })
            .Where(t => t.Service is not null && interfaceType.IsAssignableFrom(t.Service));

        foreach (var type in interfaceTypes)
        {
            services.AddService(type.Service!, type.Implementation, lifeTime);
        }

        return services;
    }

    private static IServiceCollection AddService(this IServiceCollection services, Type service, Type implementation,
        ServiceLifetime lifeTime)
    {
        return lifeTime switch
        {
            ServiceLifetime.Singleton => services.AddSingleton(service, implementation),
            ServiceLifetime.Scoped => services.AddScoped(service, implementation),
            ServiceLifetime.Transient => services.AddTransient(service, implementation),
            _ => throw new ArgumentException("Invalid lifetime", nameof(lifeTime))
        };
    }
}