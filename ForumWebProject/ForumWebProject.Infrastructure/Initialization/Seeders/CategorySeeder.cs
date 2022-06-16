using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Infrastructure.Initialization.Seeders;

public class CategorySeeder : ICustomSeeder
{
    private readonly ForumContext _forumContext;

    public CategorySeeder(ForumContext forumContext)
    {
        _forumContext = forumContext;
    }

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        _forumContext.Categories.AddRange(new[]
        {
            new Category()
            {
                Id = Guid.Parse("6e4c4e9b-4b3b-46ab-ad28-5fb86b194346"),
                Name = "Animals",
                Description = "Animal planet"
            }
        });

        await _forumContext.SaveChangesAsync(cancellationToken);
    }
}