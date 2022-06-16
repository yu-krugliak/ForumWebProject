using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Infrastructure.Initialization.Seeders;

public class TopicSeeder : ICustomSeeder
{
    private readonly ForumContext _forumContext;

    public TopicSeeder(ForumContext forumContext)
    {
        _forumContext = forumContext;
    }

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        _forumContext.Topics.AddRange(new []
        {
            new Topic()
            {
                Id = Guid.Parse("17cc2b11-18ea-4ca1-be0a-5b211c25a515"),
                Name = "Cute Cats",
                Description = "Topic about kitties :3",
                CategoryId = Guid.Parse("6e4c4e9b-4b3b-46ab-ad28-5fb86b194346")
            },
            new Topic()
            {
                Id = Guid.Parse("ceeaa742-ef5a-4c04-9333-60d2e59fff0a"),
                Name = "Frogs",
                Description = "Topic green frogs",
                CategoryId = Guid.Parse("6e4c4e9b-4b3b-46ab-ad28-5fb86b194346")
            }
        });

        await _forumContext.SaveChangesAsync(cancellationToken);
    }
}