using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Infrastructure.Repositories.Interfaces
{
    public interface ITopicRepository : IRepository<Topic>
    {
        Task<IEnumerable<Topic>> GetByCategoryId(Guid categoryId);
    }
}
