using ForumWebProject.Application.Auth.Permissions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForumWebProject.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TokenController : ControllerBase
{
    private readonly ITokenService _tokenService;

    public TokenController(ITokenService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Get([FromBody] TokenRequest request, CancellationToken cancellationToken)
    {
        return Ok(await _tokenService.GetTokenAsync(request, cancellationToken));
    }
}
