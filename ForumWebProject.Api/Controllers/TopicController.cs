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
        [ProducesResponseType(typeof(TopicView[]), 200)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _topicService.GetAllTopicsAsync());
        }

        [HttpGet("bycategory/{id}")]
        [AllowAnonymous]
        //[MustHavePermission(ForumAction.Read, ForumResource.Topics)]
        [ProducesResponseType(typeof(TopicView[]), 200)]
        public async Task<IActionResult> GetAllTopicByCategory(Guid id)
        {
            return Ok(await _topicService.GetAllTopicsByCategoryIdAsync(id));
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        //[MustHavePermission(ForumAction.Read, ForumResource.Topics)]
        [ProducesResponseType(typeof(TopicView), 200)]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await _topicService.GetTopicByIdAsync(id));
        }

        [HttpPost]
        [MustHavePermission(ForumAction.Create, ForumResource.Topics)]
        [ProducesResponseType(typeof(TopicView), 200)]
        public async Task<IActionResult> Add([FromBody] TopicRequest request)
        {
            return Ok(await _topicService.AddTopicAsync(request));
        }

        [HttpPut("{topicId}")]
        [MustHavePermission(ForumAction.Edit, ForumResource.Topics)]
        public async Task<IActionResult> Update(Guid topicId, [FromBody] TopicRequest request)
        {
            await _topicService.UpdateTopicAsync(topicId, request);
            return Ok();
        }
        
        [HttpDelete("{topicId}")]
        [MustHavePermission(ForumAction.Delete, ForumResource.Topics)]
        public async Task<IActionResult> Delete(Guid topicId)
        {
            await _topicService.DeleteByTopicIdAsync(topicId);
            return Ok();
        }
    }
}
