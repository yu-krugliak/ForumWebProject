namespace ForumWebProject.Application.Models;

public record TopicRequest(Guid Id, string Name, string Description, Guid ParentCategoryId);
