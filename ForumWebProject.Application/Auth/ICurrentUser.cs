namespace ForumWebProject.Application.Auth;

public interface ICurrentUser
{
    void SetUser(UserClaims user);
    Guid GetUserId();
    string GetUserRole();
}