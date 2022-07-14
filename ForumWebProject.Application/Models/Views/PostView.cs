namespace ForumWebProject.Application.Models.Views;

public class PostView
{
    public Guid Id { get; set; }
    
    public string? Text { get; set; }
    public DateTime DatePosted { get; set; }

    public Guid UserIdCreated { get; set; }
    public Guid TopicId { get; set; }
    public Guid? ReplyToPostId { get; set; }

    public string? UserName { get; set; }
    public string? UserFirstName { get; set; }
    public string? UserLastName { get; set; }
    public DateTime UserRegistrationDate { get; set; }

    public PostView? ReplyTo { get; set; }
}