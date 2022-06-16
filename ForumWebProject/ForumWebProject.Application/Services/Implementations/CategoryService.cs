using ForumWebProject.Application.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ForumWebProject.Application.Models;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Mapster;

namespace ForumWebProject.Application.Services.Implementations
{

    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<CategoryView>> GetAllCategoriesAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();

            if (categories is null)
            {
                throw new NotImplementedException(nameof(categories));
            }

            var categoriesViews = categories.Adapt<IEnumerable<CategoryView>>();

            return categoriesViews;
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesByParentIdAsync(Guid id)
        {
            var categories = await _categoryRepository.GetByParentIdAsync(id);

            if (categories is null)
            {
                throw new NotImplementedException(nameof(categories));
            }

            return categories;
        }
    }
}
