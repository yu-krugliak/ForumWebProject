using Microsoft.Extensions.DependencyInjection;

namespace ForumWebProject.Infrastructure.Initialization;

public class SeederRunner
{
    private readonly ICustomSeeder[] _seeders;

    public SeederRunner(IServiceProvider serviceProvider) =>
        _seeders = serviceProvider.GetServices<ICustomSeeder>().ToArray();

    public async Task RunSeedersAsync(CancellationToken cancellationToken)
    {
        foreach (var customSeeder in _seeders)
        {
            await customSeeder.InitializeAsync(cancellationToken);
        }
    }
}