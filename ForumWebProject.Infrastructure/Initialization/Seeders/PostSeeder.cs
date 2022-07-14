using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Infrastructure.Initialization.Seeders;

public class PostSeeder : ICustomSeeder
{
    private readonly ForumContext _forumContext;

    public PostSeeder(ForumContext forumContext)
    {
        _forumContext = forumContext;
    }

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        //For Cats
        _forumContext.Posts.AddRange(new[]
        {
            new Post()
            {
                Id = Guid.Parse("e644b4ae-13f5-47d4-858f-dad8e9e9cc22"),
                Text = "I have a nice cat, and you?",
                DatePosted = DateTime.UtcNow,
                UserIdCreated = Guid.Parse("45fcee09-808d-42aa-a49e-985ceceaf9c9"),
                TopicId = Guid.Parse("17cc2b11-18ea-4ca1-be0a-5b211c25a515"),
            },
            new Post()
            {
                Id = Guid.Parse("cab128d9-3886-40a9-afc7-6d8ee91fdd7f"),
                Text = "Guys????",
                DatePosted = DateTime.UtcNow,
                UserIdCreated = Guid.Parse("45fcee09-808d-42aa-a49e-985ceceaf9c9"),
                TopicId = Guid.Parse("17cc2b11-18ea-4ca1-be0a-5b211c25a515"),
            }
        });

        //For Frogs
        _forumContext.Posts.AddRange(new[]
        {
            new Post()
            {
                Id = Guid.Parse("5bf67b2b-f22f-4a46-8d96-03c923077e7b"),
                Text = "Also I have green frog. Guys can someone respond??",
                //DatePosted = DateTime.Now,
                UserIdCreated = Guid.Parse("45fcee09-808d-42aa-a49e-985ceceaf9c9"),
                TopicId = Guid.Parse("ceeaa742-ef5a-4c04-9333-60d2e59fff0a"),
            },
            new Post()
            {
                Id = Guid.Parse("da0e72da-e952-4769-9e71-dc363cdf99b6"),
                Text = "HELOOOOOOO????",
                //DatePosted = DateTime.Now,
                UserIdCreated = Guid.Parse("45fcee09-808d-42aa-a49e-985ceceaf9c9"),
                TopicId = Guid.Parse("ceeaa742-ef5a-4c04-9333-60d2e59fff0a")
            }
        });

        await _forumContext.SaveChangesAsync(cancellationToken);
    }
}