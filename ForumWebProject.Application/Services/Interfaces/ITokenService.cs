using ForumWebProject.Application.Models;
using ForumWebProject.Application.Models.Requests;
using ForumWebProject.Application.Models.Views;

namespace ForumWebProject.Application.Services.Interfaces;

public interface ITokenService
{
    Task<TokenView> GetTokenAsync(TokenRequest request, CancellationToken cancellationToken);
}