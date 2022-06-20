namespace ForumWebProject.Infrastructure.Entities
{
    public class Category : IEntity<Guid>
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public Guid? ParentCategoryId { get; set; }
        public virtual Category? ParentCategory { get; set; }

        public virtual ICollection<Category>? ChildCategories { get; set; }
        public virtual ICollection<Topic>? Topics { get; set; }
    }
}
