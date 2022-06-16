using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Infrastructure.Repositories.Interfaces
{
    public interface IPostRepository : IRepository<Post>
    {
        Task<IEnumerable<Post>> GetByTopicId();
        Task<IEnumerable<Post>> GetByUserId();
    }
}
