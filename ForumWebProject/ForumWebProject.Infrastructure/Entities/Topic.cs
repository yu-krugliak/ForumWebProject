using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForumWebProject.Infrastructure.Entities
{
    public class Topic
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
