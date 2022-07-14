using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ForumWebProject.Application.Auth.Jwt;
using ForumWebProject.Application.Exceptions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Models.Requests;
using ForumWebProject.Application.Models.Views;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Infrastructure.Identity;
using ForumWebProject.Shared.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ForumWebProject.Application.Services.Implementations;

public class TokenService : ITokenService
{
    private readonly UserManager<User> _userManager;
    private readonly JwtSettings _jwtSettings;

    public TokenService(UserManager<User> userManager, IOptions<JwtSettings> jwtOptions)
    {
        _userManager = userManager;
        _jwtSettings = jwtOptions.Value;
    }

    public async Task<TokenView> GetTokenAsync(TokenRequest request, CancellationToken cancellationToken)
    {
        if (await _userManager.FindByEmailAsync(request.Email.Trim().Normalize()) is not { } user ||
            !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            throw new UnauthorizedException("Wrong email or password.");
        }

        return GenerateTokenResponse(user);
    }

    private TokenView GenerateTokenResponse(User user)
    {
        var token = GenerateToken(user);

        return new TokenView(
            ExpiryTime: DateTime.UtcNow.AddMinutes(_jwtSettings.TokenExpirationInMinutes),
            Token: token,
            RefreshToken: string.Empty
        );
    }

    private string GenerateToken(User user)
    {
        byte[] secret = Encoding.UTF8.GetBytes(_jwtSettings.Key);
        var credentials = new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ForumClaims.FullName, $"{user.FirstName} {user.LastName}")
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwtSettings.TokenExpirationInMinutes),
            signingCredentials: credentials);
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }
}