using ForumWebProject.Application.Models;

namespace ForumWebProject.Application.Services.Interfaces;

public interface ITokenService
{
    Task<TokenView> GetTokenAsync(TokenRequest request, CancellationToken cancellationToken);
}