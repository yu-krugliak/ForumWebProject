using ForumWebProject.Infrastructure.Entities;
using Microsoft.AspNetCore.Identity;

namespace ForumWebProject.Infrastructure.Identity
{
    public class RoleClaim : IdentityRoleClaim<Guid>
    {
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
