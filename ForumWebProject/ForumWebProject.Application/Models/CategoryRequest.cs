namespace ForumWebProject.Application.Models;

public record CategoryRequest(string Name, string Description, Guid? ParentCategoryId);