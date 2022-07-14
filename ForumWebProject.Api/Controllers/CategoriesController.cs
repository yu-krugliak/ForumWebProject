using System.Net;
using ForumWebProject.Application.Auth.Permissions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Models.Requests;
using ForumWebProject.Application.Models.Views;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Shared.Authorization.Permissions;
using Microsoft.AspNetCore.Authorization;
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
        [AllowAnonymous]
        //[MustHavePermission(ForumAction.Read, ForumResource.Categories)]
        [ProducesResponseType(typeof(CategoryView[]), 200)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _categoryService.GetAllCategoriesAsync());
        }

        [HttpGet("byparent/{id}")]
        [MustHavePermission(ForumAction.Read, ForumResource.Categories)]
        [ProducesResponseType(typeof(CategoryView[]), 200)]
        public async Task<IActionResult> GetAllCategoriesByParent(Guid id)
        {
            return Ok(await _categoryService.GetAllCategoriesByParentIdAsync(id));
        }

        [HttpGet("{id}")]
        [MustHavePermission(ForumAction.Read, ForumResource.Categories)]
        [ProducesResponseType(typeof(CategoryView), 200)]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await _categoryService.GetCategoryByIdAsync(id));
        }

        [HttpPost]
        [MustHavePermission(ForumAction.Create, ForumResource.Categories)]
        [ProducesResponseType(typeof(CategoryView), (int)HttpStatusCode.Created)]
        public async Task<IActionResult> Add([FromBody] CategoryRequest request)
        {
            var result = await _categoryService.AddCategoryAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{categoryId}")]
        [MustHavePermission(ForumAction.Edit, ForumResource.Categories)]
        public async Task<IActionResult> Update(Guid categoryId, [FromBody] CategoryRequest request)
        {
            await _categoryService.UpdateCategoryAsync(categoryId, request);
            return Ok();
        }
        
        [HttpDelete("{categoryId}")]
        [MustHavePermission(ForumAction.Delete, ForumResource.Categories)]
        public async Task<IActionResult> Delete(Guid categoryId)
        {
            await _categoryService.DeleteByCategoryIdAsync(categoryId);
            return Ok();
        }
    }
}
