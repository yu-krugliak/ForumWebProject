using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Identity;
using ForumWebProject.Infrastructure.Initialization.Seeders;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace ForumWebProject.Infrastructure.Initialization;

public class ForumContextSeeder
{
    private readonly SeederRunner _seederRunner;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<Role> _roleManager;
    private readonly IRoleClaimRepository _roleClaimRepository;
    private readonly IPermissionRepository _permissionRepository;
    private readonly ForumContext _context;

    public ForumContextSeeder(SeederRunner seederRunner, ForumContext context, UserManager<User> userManager, RoleManager<Role> roleManager, IPermissionRepository permissionRepository)
    {
        _seederRunner = seederRunner;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
        _permissionRepository = permissionRepository;
    }

    public async Task SeedDatabaseAsync(CancellationToken cancellationToken)
    {
        await _context.Database.EnsureDeletedAsync(cancellationToken);
        await _context.Database.EnsureCreatedAsync(cancellationToken);

        await new RoleSeeder(_roleManager, _permissionRepository).InitializeAsync(cancellationToken);
        await new UserSeeder(_context, _userManager).InitializeAsync(cancellationToken);
        await new CategorySeeder(_context).InitializeAsync(cancellationToken);
        await new TopicSeeder(_context).InitializeAsync(cancellationToken);
        await new PostSeeder(_context).InitializeAsync(cancellationToken);

        //await _seederRunner.RunSeedersAsync(cancellationToken);
    }
}