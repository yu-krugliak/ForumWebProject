using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Infrastructure.Repositories.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class, IEntity<Guid>
    {
        Task<IEnumerable<TEntity>> GetAllAsync();

        Task<TEntity?> GetByIdAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);

        Task<TEntity> AddAsync(TEntity entity);

        Task<bool> DeleteAsync(TEntity entity);

        Task<bool> DeleteByIdAsync(Guid id);

        Task<bool> UpdateAsync(TEntity entity);

    }
}
