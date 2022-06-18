using System.Net;
using ForumWebProject.Application.Exceptions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Infrastructure.Identity;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Mapster;

namespace ForumWebProject.Application.Services.Implementations;

public class PermissionService : IPermissionService
{
    private readonly IPermissionRepository _permissionRepository;

    public PermissionService(IPermissionRepository permissionRepository)
    {
        _permissionRepository = permissionRepository;
    }

    public async Task<IEnumerable<PermissionView>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var permissions = await _permissionRepository.GetAllAsync();
        return permissions.Adapt<IEnumerable<PermissionView>>();
    }

    public async Task<PermissionView> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var permission = await _permissionRepository.GetByIdAsync(id);
        if (permission is null)
        {
            throw new NotFoundException($"Permissin with id {id} not found.");
        }

        return permission.Adapt<PermissionView>();
    }

    public async Task GrantToRole(Guid permissionId, Guid roleId, CancellationToken cancellationToken = default)
    {
        await _permissionRepository.GrantToRole(permissionId, roleId, cancellationToken);
    }

    public async Task RevokeFromRole(Guid permissionId, Guid roleId, CancellationToken cancellationToken = default)
    {
        await _permissionRepository.RevokeFromRole(permissionId, roleId, cancellationToken);
    }
}