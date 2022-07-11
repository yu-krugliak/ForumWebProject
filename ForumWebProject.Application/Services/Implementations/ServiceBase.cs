using ForumWebProject.Application.Exceptions;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Repositories.Interfaces;

namespace ForumWebProject.Application.Services.Implementations;

public class ServiceBase<TEntity> : IService<TEntity> where TEntity : class, IEntity<Guid>
{
    private readonly IRepository<TEntity> _repository;

    public ServiceBase(IRepository<TEntity> repository)
    {
        _repository = repository;
    }

    public async Task<TEntity> GetExistingEntityById(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity is null)
        {
            throw new NotFoundException($"{typeof(TEntity).Name} with such id doesn't exist.");
        }

        return entity;
    }
}