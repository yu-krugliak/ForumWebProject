namespace ForumWebProject.Infrastructure.Identity;

public class Permission
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }

    public virtual ICollection<RolePermission>? RolePermissions { get; set; }
}