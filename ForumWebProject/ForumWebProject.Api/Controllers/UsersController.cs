using ForumWebProject.Application.Auth.Permissions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Shared.Authorization.Permissions;
using Microsoft.AspNetCore.Mvc;

namespace ForumWebProject.Api.Controllers;


[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    [MustHavePermission(ForumAction.Read, ForumResource.Users)]
    public async Task<IActionResult> Register([FromBody]RegisterRequest request)
    {
        await _userService.RegisterAsync(request);
        return Ok();
    }
}