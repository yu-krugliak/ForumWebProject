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
    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        private readonly ForumContext _forumContext;

        public CategoryRepository(ForumContext forumContext) : base(forumContext)
        {
            _forumContext = forumContext;
        }

        public override async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _forumContext.Categories
                // .AsNoTracking()
                // .Include(c => c.Topics!)
                // .ThenInclude(t => t.Posts)
                //.ToListAsync();
                .ToListAsync();
        }

        public async Task<IEnumerable<Category>> GetByParentIdAsync(Guid parentId)
        {
            return await _forumContext.Categories
                .Where(p => p.ParentCategoryId == parentId)
                .ToListAsync();
        }
    }
}
