using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ForumWebProject.Infrastructure.Repositories.Implementations
{
    public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly DbContext _forumContext;

        protected RepositoryBase(DbContext context)
        {
            _forumContext = context;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _forumContext.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity?> GetByIdAsync(Guid id)
        {
            return await  _forumContext.Set<TEntity>()
                .FindAsync(id);
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            _forumContext.Set<TEntity>().Add(entity);
            await _forumContext.SaveChangesAsync();

            return entity;
        }

        public async Task<bool> DeleteAsync(TEntity entity)
        {
            _forumContext.Set<TEntity>().Remove(entity);
            await _forumContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteByIdAsync(Guid id)
        {
            var record = await _forumContext.Set<TEntity>().FindAsync(id);

            if (record is null)
            {
                return false;
            }

            _forumContext.Set<TEntity>().Remove(record);
            await _forumContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateAsync(TEntity entity)
        {
            _forumContext.Set<TEntity>().Update(entity);
            await _forumContext.SaveChangesAsync();

            return true;
        }
    }
}
