using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ForumWebProject.Infrastructure.Repositories.Implementations
{
    public class PostRepository : RepositoryBase<Post>, IPostRepository
    {
        public PostRepository(ForumContext context) : base(context)
        {
        }

        public Task<IEnumerable<Post>> GetByTopicId()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Post>> GetByUserId()
        {
            throw new NotImplementedException();
        }
    }
}
