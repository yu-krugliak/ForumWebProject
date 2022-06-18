﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ForumWebProject.Infrastructure.Identity
{
    public class Role : IdentityRole<Guid>
    {
        public string? Description { get; set; }

        public virtual ICollection<RolePermission>? RolePermissions { get; set; }

        public Role(string name, string? description = null)
        {
            Description = description;
            Name = name;
            NormalizedName = name.ToUpperInvariant();
        }
    }
}
