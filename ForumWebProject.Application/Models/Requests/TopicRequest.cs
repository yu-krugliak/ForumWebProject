namespace ForumWebProject.Application.Models.Requests;

public record TopicRequest(Guid Id, string Name, string Description, Guid CategoryId);
