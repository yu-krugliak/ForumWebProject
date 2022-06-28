using ForumWebProject.Application.Auth.Permissions;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Shared.Authorization.Permissions;
using Microsoft.AspNetCore.Mvc;

namespace ForumWebProject.Api.Controllers;


[Route("api/[controller]")]
[ApiController]
public class PermissionsController : ControllerBase
{
    private readonly IPermissionService _permissionService;

    public PermissionsController(IPermissionService permissionService)
    {
        _permissionService = permissionService;
    }

    [HttpGet]
    [MustHavePermission(ForumAction.Read, ForumResource.Permissions)]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _permissionService.GetAllAsync());
    }

    [HttpGet("{id}")]
    [MustHavePermission(ForumAction.Read, ForumResource.Permissions)]
    public async Task<IActionResult> Get(Guid id)
    {
        return Ok(await _permissionService.GetByIdAsync(id));
    }

    [HttpPut("grant")]
    [MustHavePermission(ForumAction.Edit, ForumResource.Permissions)]
    public async Task<IActionResult> Grant([FromQuery]Guid roleId, [FromQuery]Guid permissionId, CancellationToken cancellationToken)
    {
        await _permissionService.GrantToRole(permissionId, roleId, cancellationToken);
        return Ok();
    }

    [HttpPut("revoke")]
    [MustHavePermission(ForumAction.Edit, ForumResource.Permissions)]
    public async Task<IActionResult> Revoke([FromQuery] Guid roleId, [FromQuery] Guid permissionId, CancellationToken cancellationToken)
    {
        await _permissionService.RevokeFromRole(permissionId, roleId, cancellationToken);
        return Ok();
    }
}