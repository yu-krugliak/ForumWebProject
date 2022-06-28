namespace ForumWebProject.Application.Models;

public record RegisterRequest(string Email, string UserName, string FirstName, string LastName, string Password, string ConfirmPassword);