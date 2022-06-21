namespace ForumWebProject.Application.Models;

public record RegisterRequest(string Email, string UserName, string FirstName, string Password, string ConfirmPassword);