using ForumWebProject.Application.Models;
using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Application.Services.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryView>> GetAllCategoriesAsync();
    Task<IEnumerable<Category>> GetAllCategoriesByParentIdAsync(Guid id);
}
