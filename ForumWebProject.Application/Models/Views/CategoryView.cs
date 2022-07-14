namespace ForumWebProject.Application.Models.Views;

public class CategoryView
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public Guid? ParentCategoryId { get; set; }
}