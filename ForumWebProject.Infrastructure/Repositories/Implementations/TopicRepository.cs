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

        public async Task<Topic?> GetByNameAsync(string topicName)
        {
            return await _forumContext.Topics.FirstOrDefaultAsync(c => c.Name == topicName);
        }
    }
}
