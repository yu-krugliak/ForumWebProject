using ForumWebProject.Application.Models;
using ForumWebProject.Application.Models.Requests;
using ForumWebProject.Application.Models.Views;
using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Application.Services.Interfaces;

public interface ICategoryService : IService<Category>
{
    Task<IEnumerable<CategoryView>> GetAllCategoriesAsync();
    Task<IEnumerable<CategoryView>> GetAllCategoriesByParentIdAsync(Guid parentCategoryId);

    Task<CategoryView> GetCategoryByIdAsync(Guid categoryId);
    Task<CategoryView> AddCategoryAsync(CategoryRequest categoryRequest);

    Task DeleteCategoryAsync(Guid categoryId, CategoryRequest categoryRequest);
    Task DeleteByCategoryIdAsync(Guid categoryId);

    Task UpdateCategoryAsync(Guid categoryId, CategoryRequest categoryRequest);
}