namespace ForumWebProject.Application.Models;

public record TokenView(string Token, string RefreshToken, DateTime ExpiryTime);