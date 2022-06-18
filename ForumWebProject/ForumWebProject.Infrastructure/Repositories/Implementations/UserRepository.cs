using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Identity;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ForumWebProject.Infrastructure.Repositories.Implementations
{
    internal class UserRepository : RepositoryBase<User>, IUserRepository
    {
        private readonly ForumContext _forumContext;

        public UserRepository(ForumContext forumContext) : base(forumContext)
        {
            _forumContext = forumContext;
        }
    }
}
