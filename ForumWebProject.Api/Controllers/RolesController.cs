using ForumWebProject.Application.Auth.Permissions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Shared.Authorization.Permissions;
using Microsoft.AspNetCore.Mvc;

namespace ForumWebProject.Api.Controllers;


[Route("api/[controller]")]
[ApiController]
public class RolesController : ControllerBase
{
    private readonly IRoleService _roleService;

    public RolesController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    [HttpGet]
    [MustHavePermission(ForumAction.Read, ForumResource.Roles)]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _roleService.GetAllAsync());
    }

    [HttpGet("{id}")]
    [MustHavePermission(ForumAction.Read, ForumResource.Roles)]
    public async Task<IActionResult> GetAll(Guid id)
    {
        return Ok(await _roleService.GetByIdAsync(id));
    }

    [HttpPost]
    [MustHavePermission(ForumAction.Create, ForumResource.Roles)]
    public async Task<IActionResult> Add([FromBody]RoleRequest request)
    {
        return Ok(await _roleService.AddRoleAsync(request));
    }
}