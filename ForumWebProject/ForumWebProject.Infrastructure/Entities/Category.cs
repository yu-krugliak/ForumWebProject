using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForumWebProject.Infrastructure.Entities
{
    public class Category
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
