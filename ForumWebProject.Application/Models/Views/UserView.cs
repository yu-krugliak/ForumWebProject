namespace ForumWebProject.Application.Models.Views;

public record UserView(Guid Id, string NormalizedEmail, string FirstName, string LastName, string NormalizedUserName);
