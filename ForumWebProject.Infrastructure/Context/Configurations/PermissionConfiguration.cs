using ForumWebProject.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ForumWebProject.Infrastructure.Context.Configurations;

public class PermissionConfiguration : IEntityTypeConfiguration<Permission>
{
    public void Configure(EntityTypeBuilder<Permission> builder)
    {
        builder.HasKey(permission => permission.Id);

        builder.Property(permission => permission.Name);
        builder.Property(permission => permission.Description);

        // builder.HasMany(permission => permission.Roles)
        //     .WithMany(role => role.Permissions)
        //     .UsingEntity<>();
    }
}