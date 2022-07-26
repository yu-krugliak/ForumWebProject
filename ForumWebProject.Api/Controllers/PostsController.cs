using ForumWebProject.Application.Auth.Permissions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Models.Queries;
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
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostsController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(PostView[]), 200)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _postService.GetAllPostsAsync());
        }

        [HttpGet("bytopic/{id}")]
        [AllowAnonymous]
        //[MustHavePermission(ForumAction.Read, ForumResource.Posts)]
        [ProducesResponseType(typeof(PostView[]), 200)]
        public async Task<IActionResult> GetAllPostsByTopic(Guid id, [FromQuery] PaginationQuery query)
        {
            //return Ok(await _postService.GetAllPostsByTopicIdAndSliceAsync(id, query));
            return Ok(await _postService.GetAllPostsByTopicIdAsync(id));
        }
        
        [HttpGet("byuser/{id}")]
        [MustHavePermission(ForumAction.Read, ForumResource.Posts)]
        [ProducesResponseType(typeof(PostView[]), 200)]
        public async Task<IActionResult> GetAllPostsByUser(Guid id)
        {
            return Ok(await _postService.GetAllPostsByUserId(id));
        }
        
        [HttpGet("bytextmessage/{text}")]
        [MustHavePermission(ForumAction.Find, ForumResource.Posts)]
        [ProducesResponseType(typeof(PostView[]), 200)]
        public async Task<IActionResult> GetAllPostsByText(string text)
        {
            return Ok(await _postService.FindPostsByContainingText(text));
        }
        
        [HttpGet("fromdate/{startDate}/todate/{endDate}")]
        [MustHavePermission(ForumAction.Find, ForumResource.Posts)]
        [ProducesResponseType(typeof(PostView[]), 200)]
        public async Task<IActionResult> GetAllPostsByDatePeriod(DateTime startDate, DateTime endDate)
        {
            return Ok(await _postService.FindPostsByDatePeriod(startDate, endDate));
        }

        [HttpGet("{id}")]
        [MustHavePermission(ForumAction.Read, ForumResource.Posts)]
        [ProducesResponseType(typeof(PostView), 200)]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await _postService.GetPostByIdAsync(id));
        }

        [HttpPost]
        [MustHavePermission(ForumAction.Create, ForumResource.Posts)]
        [ProducesResponseType(typeof(PostView), 200)]
        public async Task<IActionResult> Add([FromBody] PostRequest request)
        {
            return Ok(await _postService.AddPostAsync(request));
        }

        [HttpPut("{postId}")]
        [MustHavePermission(ForumAction.Edit, ForumResource.Posts)]
        public async Task<IActionResult> Update(Guid postId, [FromBody] PostRequest request)
        {
            await _postService.UpdatePostAsync(postId, request);
            return Ok();
        }
        
        [HttpDelete("{postId}")]
        [MustHavePermission(ForumAction.Delete, ForumResource.Posts)]
        public async Task<IActionResult> Delete(Guid postId)
        {
            await _postService.DeleteByPostIdAsync(postId);
            return Ok();
        }
    }
}
