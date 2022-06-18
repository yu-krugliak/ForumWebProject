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
        var user = new User()
        {
            Id = Guid.Parse("45fcee09-808d-42aa-a49e-985ceceaf9c9"),
            Email = "u@u.com",
            FirstName = "Sad",
            LastName = "Pepe",
            UserName = "username",
            NormalizedEmail = "u@u.com".ToUpperInvariant(),
            NormalizedUserName = "username".ToUpperInvariant()
        };
        await AddUser(user, "1111", ForumRoles.User);

        var adminUser = new User()
        {
            Id = Guid.Parse("fca6323b-3f0a-49f8-a297-61867db6bdb6"),
            FirstName = "Pepe",
            LastName = "Pepegovich",
            Email = "sadpepe@gmail.com",
            UserName = "admin007",
            NormalizedEmail = "sadpepe@gmail.com".ToUpperInvariant(),
            NormalizedUserName = "admin007".ToUpperInvariant()
        };
        await AddUser(adminUser, "secure", ForumRoles.Admin);
    }

    private async Task AddUser(User user, string password, string role)
    {
        var hasher = new PasswordHasher<User>();
        user.PasswordHash = hasher.HashPassword(user, password);

        var result = await _userManager.CreateAsync(user);
        var result1 = await _userManager.AddToRoleAsync(user, role);
    }
}