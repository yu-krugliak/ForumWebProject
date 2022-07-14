using ForumWebProject.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ForumWebProject.Infrastructure.Context.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(category => category.Id);

            builder.Property(category => category.Name);
            builder.Property(category => category.Description);

            // builder.Property(category => category.ParentCategoryId).IsRequired(false);

            builder.HasOne(category => category.ParentCategory)
                .WithMany(parent => parent.ChildCategories)
                .HasForeignKey(category => category.ParentCategoryId)
                .IsRequired(false);

            builder.HasMany(category => category.ChildCategories)
                .WithOne(child => child.ParentCategory)
                .HasForeignKey(child => child.ParentCategoryId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);

            builder.HasMany(category => category.Topics)
                .WithOne(topic => topic.Category)
                .HasForeignKey(topic => topic.CategoryId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
        }
    }
}
