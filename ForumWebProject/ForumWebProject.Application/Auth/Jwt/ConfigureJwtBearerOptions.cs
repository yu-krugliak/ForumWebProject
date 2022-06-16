using System.Net;
using System.Security.Claims;
using System.Text;
using ForumWebProject.Application.Exceptions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ForumWebProject.Application.Auth.Jwt;

public class ConfigureJwtBearerOptions : IConfigureNamedOptions<JwtBearerOptions>
{
    private readonly JwtSettings _jwtSettings;

    public ConfigureJwtBearerOptions(IOptions<JwtSettings> options)
    {
        _jwtSettings = options.Value;
    }

    public void Configure(JwtBearerOptions options)
    {
        Configure(string.Empty, options);
    }

    public void Configure(string name, JwtBearerOptions options)
    {
        if (name != JwtBearerDefaults.AuthenticationScheme)
        {
            return;
        }

        byte[] key = Encoding.ASCII.GetBytes(_jwtSettings.Key);

        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            RoleClaimType = ClaimTypes.Role,
            ClockSkew = TimeSpan.Zero
        };
        options.Events = new JwtBearerEvents()
        {
            OnChallenge = context =>
            {
                context.HandleResponse();
                if (!context.Response.HasStarted)
                {
                    throw new UnauthorizedException("Auth Failed");
                }

                return Task.CompletedTask;
            },
            OnForbidden = _ => throw new CustomException("Not authorized to access", null, HttpStatusCode.Forbidden)
        };

    }
}