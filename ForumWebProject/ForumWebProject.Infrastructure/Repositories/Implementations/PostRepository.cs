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
        private readonly ForumContext _forumContext;
        public PostRepository(ForumContext forumContext) : base(forumContext)
        {
            this._forumContext = forumContext;
        }

        public async Task<IEnumerable<Post>> GetByTopicId(Guid topicId)
        {
            return await _forumContext.Posts
                .Where(p => p.TopicId == topicId).ToListAsync();
        }

        public async Task<IEnumerable<Post>> GetByUserId(Guid userId)
        {
            return await _forumContext.Posts
                .Where(p => p.UserIdCreated == userId).ToListAsync();
        }
    }
}
