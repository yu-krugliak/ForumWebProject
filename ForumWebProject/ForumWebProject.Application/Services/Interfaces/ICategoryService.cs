using ForumWebProject.Application.Models;
using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Application.Services.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryView>> GetAllCategoriesAsync();
    Task<IEnumerable<CategoryView>> GetAllCategoriesByParentIdAsync(Guid id);

    Task<CategoryView> GetCategoryByIdAsync(Guid id);
    Task<CategoryView> AddCategoryAsync(CategoryView entity);

    Task<bool> DeleteCategoryAsync(CategoryView entity);

    Task<bool> DeleteByCategoryIdAsync(Guid id);

    Task<bool> UpdateCategoryAsync(CategoryView entity);
}
