using ForumWebProject.Application.Models;
using ForumWebProject.Application.Models.Queries;
using ForumWebProject.Application.Models.Requests;
using ForumWebProject.Application.Models.Views;
using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Application.Services.Interfaces;

public interface IPostService : IService<Post>
{
    Task<IEnumerable<PostView>> GetAllPostsAsync();
    Task<IEnumerable<PostView>> GetAllPostsByTopicIdAsync(Guid topicId);
    Task<IEnumerable<PostView>> GetAllPostsByTopicIdAndSliceAsync(Guid topicId, PaginationQuery query);
    Task<IEnumerable<PostView>> GetAllPostsByUserId(Guid userId);
    Task<PostView> GetPostByIdAsync(Guid postId);
    
    Task<PostView> AddPostAsync(PostRequest postRequest);

    Task DeletePostAsync(Guid postId, PostRequest postRequest);
    Task DeleteByPostIdAsync(Guid postId);

    Task UpdatePostAsync(Guid postId, PostRequest postRequest);
    
    Task<IEnumerable<PostView>> FindPostsByContainingText(string textFilter);
    Task<IEnumerable<PostView>> FindPostsByDatePeriod(DateTime dateStart, DateTime dateEnd);
    //statisctics
}