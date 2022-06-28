using ForumWebProject.Application.Auth.Permissions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Shared.Authorization.Permissions;
using Microsoft.AspNetCore.Authorization;
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
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody]RegisterRequest request)
    {
        await _userService.RegisterAsync(request);
        return Ok();
    }
    
    [HttpGet("permissions")]
    [MustHavePermission(ForumAction.Read, ForumResource.Users)]
    [ProducesResponseType(typeof(string[]), 200)]
    public async Task<IActionResult> GetPermissions()
    {
        return Ok(await _userService.GetCurrentUserPermissions());
    }

    [HttpPut("{userId}/addrole/{roleId}")]
    [MustHavePermission(ForumAction.Edit, ForumResource.Roles)]
    public async Task<IActionResult> AddRole(string userId, string roleId)
    {
        await _userService.AddRoleAsync(userId, roleId);
        return Ok();
    }

    [HttpPut("{userId}/removerole/{roleId}")]
    [MustHavePermission(ForumAction.Edit, ForumResource.Roles)]
    public async Task<IActionResult> RemoveRole(string userId, string roleId)
    {
        await _userService.RemoveRoleAsync(userId, roleId);
        return Ok();
    }
}