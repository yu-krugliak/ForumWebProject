using ForumWebProject.Infrastructure.Entities;
using Microsoft.AspNetCore.Identity;

namespace ForumWebProject.Infrastructure.Identity
{
    public class User : IdentityUser<Guid>, IEntity<Guid>
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime RegistrationDate { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
