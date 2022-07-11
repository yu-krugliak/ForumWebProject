using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ForumWebProject.Api.IntegrationTests;

public class ApplicationFactory<TStartup>
    : WebApplicationFactory<TStartup> where TStartup: class
{
    public ForumContext ForumContext { get; set; }
    
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(
                d => d.ServiceType ==
                     typeof(DbContextOptions<ForumContext>));

            services.Remove(descriptor);

            services.AddDbContext<ForumContext>(options =>
            {
                options.UseInMemoryDatabase("InMemoryDbForTesting");
            });

            var sp = services.BuildServiceProvider();

            using var scope = sp.CreateScope();
            var scopedServices = scope.ServiceProvider;
            var forumContext = scopedServices.GetRequiredService<ForumContext>();
            var logger = scopedServices
                .GetRequiredService<ILogger<ApplicationFactory<TStartup>>>();

            forumContext.Database.EnsureDeleted();
            forumContext.Database.EnsureCreated();
            forumContext.Categories.Add(new Category()
            {
                Name = "Test",
                Description = "Desc"
            });
            forumContext.SaveChanges();

            // Seeding here please
        });
    }
}