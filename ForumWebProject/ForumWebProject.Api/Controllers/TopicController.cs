using ForumWebProject.Application.Auth.Permissions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Shared.Authorization.Permissions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForumWebProject.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly ITopicService _topicService;

        public TopicController(ITopicService topicService)
        {
            _topicService = topicService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _topicService.GetAllTopicsAsync());
        }

        [HttpGet("byparent/{id}")]
        [MustHavePermission(ForumAction.Read, ForumResource.Categories)]
        public async Task<IActionResult> GetAllTopicByCategory(Guid id)
        {
            return Ok(await _topicService.GetAllTopicsByCategoryIdAsync(id));
        }

        [HttpGet("{id}")]
        [MustHavePermission(ForumAction.Read, ForumResource.Categories)]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await _topicService.GetTopicByIdAsync(id));
        }

        [HttpPost]
        [MustHavePermission(ForumAction.Create, ForumResource.Categories)]
        public async Task<IActionResult> Add([FromBody] TopicRequest request)
        {
            return Ok(await _topicService.AddTopicAsync(request));
        }

        [HttpPut("{topicId}")]
        [MustHavePermission(ForumAction.Edit, ForumResource.Categories)]
        public async Task<IActionResult> Update(Guid topicId, [FromBody] TopicRequest request)
        {
            await _topicService.UpdateCategoryAsync(topicId, request);
            return Ok();
        }
        
        [HttpDelete("{topicId}")]
        [MustHavePermission(ForumAction.Delete, ForumResource.Categories)]
        public async Task<IActionResult> Delete(Guid topicId)
        {
            await _topicService.DeleteByTopicIdAsync(topicId);
            return Ok();
        }
    }
}
