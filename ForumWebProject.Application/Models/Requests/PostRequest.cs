namespace ForumWebProject.Application.Models.Requests;

public class PostRequest
{
    public string? Text { get; set; }
    public Guid TopicId { get; set; }
    public Guid? ReplyToPostId { get; set; }
}