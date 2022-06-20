using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Application.Exceptions;
using ForumWebProject.Application.Models;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Mapster;

namespace ForumWebProject.Application.Services.Implementations
{

    public class CategoryService : ServiceBase<Category>, ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository) : base(categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<CategoryView>> GetAllCategoriesAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();

            if (categories is null)
            {
                throw new NotFoundException("Categories not found.");
            }

            var categoriesViews = categories.Adapt<IEnumerable<CategoryView>>();

            return categoriesViews;
        }

        public async Task<IEnumerable<CategoryView>> GetAllCategoriesByParentIdAsync(Guid parentCategoryId)
        {
            var categories = await _categoryRepository.GetByParentIdAsync(parentCategoryId);

            if (categories is null)
            {
                throw new NotFoundException("Categories in this parent category not found.");
            }

            var categoriesViews = categories.Adapt<IEnumerable<CategoryView>>();

            return categoriesViews;
        }

        public async Task<CategoryView> GetCategoryByIdAsync(Guid categoryId)
        {
            var category = await GetExistingEntityById(categoryId);

            var categoryView = category.Adapt<CategoryView>();

            return categoryView;
        }

        public async Task<CategoryView> AddCategoryAsync(CategoryRequest categoryRequest)
        {
            var category = categoryRequest.Adapt<Category>();
            
            if (await _categoryRepository.GetByNameAsync(category.Name!) is not null)
            {
                throw new ConflictException("Category already exists.");
            }

            var addedCategory = await _categoryRepository.AddAsync(category);

            if (addedCategory is null)
            {
                throw new ServerErrorException("Can't add this category.", null);
            }

            return addedCategory.Adapt<CategoryView>();
        }

        public async Task DeleteCategoryAsync(Guid categoryId, CategoryRequest categoryRequest)
        {
            var category = await GetExistingEntityById(categoryId);
            categoryRequest.Adapt(category);

            var result = await _categoryRepository.DeleteAsync(category);

            if (!result)
            {
                throw new ServerErrorException("Can't delete this category.", null);
            }
        }

        public async Task DeleteByCategoryIdAsync(Guid categoryId)
        {
            var result = await _categoryRepository.DeleteByIdAsync(categoryId);

            if (!result)
            {
                throw new ServerErrorException("Can't delete this category.", null);
            }
        }

        public async Task UpdateCategoryAsync(Guid categoryId, CategoryRequest categoryRequest)
        {
            var category = await GetExistingEntityById(categoryId);
            categoryRequest.Adapt(category);

            var result = await _categoryRepository.UpdateAsync(category);

            if (!result)
            {
                throw new ServerErrorException("Can't update this category.", null);
            }
        }
    }
}
