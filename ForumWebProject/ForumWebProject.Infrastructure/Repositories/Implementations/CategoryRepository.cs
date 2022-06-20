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

        public async Task<IEnumerable<Category>> GetByParentIdAsync(Guid parentId)
        {
            return await _forumContext.Categories
                .Where(p => p.ParentCategoryId == parentId)
                .ToListAsync();
        }

        public async Task<Category?> GetByNameAsync(string categoryName)
        {
            return await _forumContext.Categories.FirstOrDefaultAsync(c => c.Name == categoryName);
        }
    }
}
