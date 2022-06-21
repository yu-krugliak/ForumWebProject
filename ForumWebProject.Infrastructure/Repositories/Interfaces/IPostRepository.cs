using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Infrastructure.Repositories.Interfaces
{
    public interface IPostRepository : IRepository<Post>
    {
        Task<IEnumerable<Post>> GetByTopicId(Guid topicId);
        Task<IEnumerable<Post>> GetByUserId(Guid userId);
    }
}
