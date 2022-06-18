namespace ForumWebProject.Shared.Authorization.Permissions;

public class ForumPermission
{
    public string Action { get; }

    public string Resource { get; }

    public string Description { get; }

    public ForumPermission(string action, string resource)
    {
        Action = action;
        Resource = resource;
        Description = $"Permission to {action.ToLowerInvariant()} {resource}";
    }

    public static string ToName(string action, string resource)
    {
        return $"{ForumClaims.Permission}.{resource}.{action}";
    }

    public override string ToString()
    {
        return ToName(Action, Resource);
    }
}