namespace ForumWebProject.Application.Models.Requests;

public record CategoryRequest(string Name, string Description, Guid? ParentCategoryId);