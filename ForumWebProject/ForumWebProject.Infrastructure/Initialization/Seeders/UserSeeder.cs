using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace ForumWebProject.Infrastructure.Initialization.Seeders;

public class UserSeeder : ICustomSeeder
{
    private readonly ForumContext _forumContext;
    public readonly UserManager<User> _userManager;

    public UserSeeder(ForumContext forumContext, UserManager<User> userManager)
    {
        _forumContext = forumContext;
        _userManager = userManager;
    }

    public async Task InitializeAsync(CancellationToken cancellationToken)
    {
        _forumContext.Users.AddRange(new[]
        {
            new User()
            {
                Id = Guid.Parse("45fcee09-808d-42aa-a49e-985ceceaf9c9"),
                FirstName = "Sad",
                LastName = "Pepe"
            }
        });

        await _forumContext.SaveChangesAsync(cancellationToken);

        var adminUser = new User()
        {
            FirstName = "Pepe",
            LastName = "Pepegovich",
            Email = "sadpepe@gmail.com",
            UserName = "admin007",
            NormalizedEmail = "sadpepe@gmail.com".ToUpperInvariant(),
            NormalizedUserName = "admin007".ToUpperInvariant()
        };

        var hasher = new PasswordHasher<User>();
        adminUser.PasswordHash = hasher.HashPassword(adminUser, "123456");
        var result =  await _userManager.CreateAsync(adminUser);
        var result1 = await _userManager.AddToRoleAsync(adminUser, ForumRoles.Admin);
    }
}