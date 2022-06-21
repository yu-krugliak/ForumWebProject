namespace ForumWebProject.Shared.Authorization.Permissions;

public static class ForumPermissions
{
    public static ForumPermission[] All = new ForumPermission[]
    {
        new(ForumAction.Read, ForumResource.Categories),
        new(ForumAction.Create, ForumResource.Categories),
        new(ForumAction.Edit, ForumResource.Categories),
        new(ForumAction.Delete, ForumResource.Categories),

        new(ForumAction.Read, ForumResource.Users),
        new(ForumAction.Create, ForumResource.Users),
        new(ForumAction.Edit, ForumResource.Users),
        new(ForumAction.Delete, ForumResource.Users),

        new(ForumAction.Read, ForumResource.Permissions),
        new(ForumAction.Create, ForumResource.Permissions),
        new(ForumAction.Edit, ForumResource.Permissions),
        new(ForumAction.Delete, ForumResource.Permissions),

        new(ForumAction.Read, ForumResource.Roles),
        new(ForumAction.Create, ForumResource.Roles),
        new(ForumAction.Edit, ForumResource.Roles),
        new(ForumAction.Delete, ForumResource.Roles),
    };

    public static ForumPermission[] Admin => All;
    public static ForumPermission[] User => All.Where(p => p.Action == ForumAction.Read).ToArray();
}