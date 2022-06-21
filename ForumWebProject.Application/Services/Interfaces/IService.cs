using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Application.Services.Interfaces;

public interface IService<TEntity> where TEntity : class
{
    Task<TEntity> GetExistingEntityById(Guid id);
}