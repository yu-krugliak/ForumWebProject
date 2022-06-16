using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ForumWebProject.Infrastructure.Context.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(topic => topic.Id);

            builder.Property(topic => topic.FirstName);
            builder.Property(topic => topic.LastName);
            builder.Property(topic => topic.UserName);
            builder.Property(topic => topic.PasswordHash);

            builder.Property(topic => topic.Email);
            builder.Property(topic => topic.PhoneNumber);
            builder.Property(topic => topic.RegistrationDate);

            builder.HasMany(user => user.Posts)
                .WithOne(post => post.User)
                .HasForeignKey(post => post.UserIdCreated)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
