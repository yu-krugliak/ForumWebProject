using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ForumWebProject.Infrastructure.Identity
{
    public class RoleClaim : IdentityRoleClaim<Guid>
    {
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
