using System.Collections.ObjectModel;

namespace ForumWebProject.Infrastructure.Identity;

public class ForumRoles
{
    public const string Admin = nameof(Admin);
    public const string User = nameof(User);

    public static IReadOnlyList<string> DefaultRoles = new ReadOnlyCollection<string>(new[]
    {
        Admin,
        User
    });
}