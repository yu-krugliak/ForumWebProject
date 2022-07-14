using ForumWebProject.Application.Models;
using ForumWebProject.Application.Models.Requests;
using ForumWebProject.Application.Models.Views;
using ForumWebProject.Infrastructure.Entities;

namespace ForumWebProject.Application.Services.Interfaces;

public interface ITopicService : IService<Topic>
{
    Task<IEnumerable<TopicView>> GetAllTopicsAsync();
    Task<IEnumerable<TopicView>> GetAllTopicsByCategoryIdAsync(Guid topicId);

    Task<TopicView> GetTopicByIdAsync(Guid topicId);
    Task<TopicView> AddTopicAsync(TopicRequest topicRequest);

    Task DeleteTopicAsync(Guid topicId, TopicRequest topicRequest);

    Task DeleteByTopicIdAsync(Guid topicId);

    Task UpdateTopicAsync(Guid topicId, TopicRequest topicRequest);
    Task<PostStatistics> GetPostsStatisticsByTopic(Guid topicId);
}