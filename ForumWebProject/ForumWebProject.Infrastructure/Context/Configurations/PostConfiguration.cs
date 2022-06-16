using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ForumWebProject.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ForumWebProject.Infrastructure.Context.Configurations
{
    public class PostConfiguration : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {
            builder.HasKey(post => new { post.PostNumber, post.Id });

            builder.Property(post => post.Text);
            builder.Property(post => post.DatePosted);

            builder.HasOne(post => post.User)
                .WithMany(user => user.Posts)
                .HasForeignKey(post => post.UserIdCreated);

            builder.HasOne(post => post.Topic)
                .WithMany(topic => topic.Posts)
                .HasForeignKey(post => post.TopicId);
        }
    }
}
