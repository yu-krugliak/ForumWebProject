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
    public class TopicRepository : RepositoryBase<Topic>, ITopicRepository
    {
        private readonly ForumContext _forumContext;
        public TopicRepository(ForumContext forumContext) : base(forumContext)
        {
            this._forumContext = forumContext;
        }
        public async Task<IEnumerable<Topic>> GetByCategoryId(Guid categoryId)
        {
            return await _forumContext.Topics
                .Where(p => p.CategoryId == categoryId).ToListAsync();
        }
    }
}
