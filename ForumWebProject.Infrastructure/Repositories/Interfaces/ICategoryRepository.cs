using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Infrastructure.Repositories.Interfaces
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<IEnumerable<Category>> GetByParentIdAsync(Guid parentId);

        Task<Category?> GetByNameAsync(string categoryName);
    }
}
