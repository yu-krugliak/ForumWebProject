using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Application.Exceptions;
using ForumWebProject.Application.Models;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Mapster;
using MapsterMapper;

namespace ForumWebProject.Application.Services.Implementations
{
    public class CategoryService : ServiceBase<Category>, ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper) : base(categoryRepository)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Returns all categories
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotFoundException"></exception>
        public async Task<IEnumerable<CategoryView>> GetAllCategoriesAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();

            var categoriesViews = _mapper.Map<IEnumerable<CategoryView>>(categories);
            return categoriesViews;
        }

        public async Task<IEnumerable<CategoryView>> GetAllCategoriesByParentIdAsync(Guid parentCategoryId)
        {
            var categories = await _categoryRepository.GetByParentIdAsync(parentCategoryId);

            var categoriesViews = _mapper.Map<IEnumerable<CategoryView>>(categories);
            return categoriesViews;
        }

        public async Task<CategoryView> GetCategoryByIdAsync(Guid categoryId)
        {
            var category = await GetExistingEntityById(categoryId);

            var categoryView = _mapper.Map<CategoryView>(category);
            return categoryView;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="categoryRequest"></param>
        /// <returns></returns>
        /// <exception cref="ConflictException"></exception>
        /// <exception cref="ServerErrorException"></exception>
        public async Task<CategoryView> AddCategoryAsync(CategoryRequest categoryRequest)
        {
            var category = _mapper.Map<Category>(categoryRequest);

            // if (await _categoryRepository.GetByNameAsync(category.Name!) is not null)
            // {
            //     throw new ConflictException("Category already exists.");
            // }

            var addedCategory = await _categoryRepository.AddAsync(category);

            // if (addedCategory is null)
            // {
            //     throw new ServerErrorException("Can't add this category.", null);
            // }

            return _mapper.Map<CategoryView>(addedCategory);
        }
        
        public async Task DeleteCategoryAsync(Guid categoryId, CategoryRequest categoryRequest)
        {
            var category = await GetExistingEntityById(categoryId);

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
                throw new NotFoundException("This Category doesn't exist.");
            }
        }

        public async Task UpdateCategoryAsync(Guid categoryId, CategoryRequest categoryRequest)
        {
            var category = await GetExistingEntityById(categoryId);
            _mapper.Map(categoryRequest, category);

            var result = await _categoryRepository.UpdateAsync(category);

            if (!result)
            {
                throw new ServerErrorException("Can't update this category.", null);
            }
        }
    }
}
