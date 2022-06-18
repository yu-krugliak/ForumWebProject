using ForumWebProject.Application.Auth.Permissions;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Shared.Authorization.Permissions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ForumWebProject.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [MustHavePermission(ForumAction.Read, ForumResource.Categories)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _categoryService.GetAllCategoriesAsync());
        }
    }
}
