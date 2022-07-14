using ForumWebProject.Application.Exceptions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Models.Requests;
using ForumWebProject.Application.Models.Views;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Mapster;
using MapsterMapper;

namespace ForumWebProject.Application.Services.Implementations
{
    public class TopicService : ServiceBase<Topic>, ITopicService
    {
        private readonly ITopicRepository _topicRepository;
        private IPostRepository _postRepository;
        private readonly IMapper _mapper;

        public TopicService(ITopicRepository topicRepository, IMapper mapper, IPostRepository postRepository) : base(topicRepository)
        {
            _topicRepository = topicRepository;
            _mapper = mapper;
            _postRepository = postRepository;
        }

        public async Task<IEnumerable<TopicView>> GetAllTopicsAsync()
        {
            var topics = await _topicRepository.GetAllAsync();

            var topicsViews = _mapper.Map<IEnumerable<TopicView>>(topics);
            return topicsViews;
        }

        public async Task<IEnumerable<TopicView>> GetAllTopicsByCategoryIdAsync(Guid topicId)
        {
            var topics = await _topicRepository.GetByCategoryId(topicId);

            var topicsViews = _mapper.Map<IEnumerable<TopicView>>(topics);
            return topicsViews;
        }

        public async Task<TopicView> GetTopicByIdAsync(Guid topicId)
        {
            var topic = await GetExistingEntityById(topicId);
            
            var topicView = _mapper.Map<TopicView>(topic);
            return topicView;
        }

        public async Task<TopicView> AddTopicAsync(TopicRequest topicRequest)
        {
            var topic = _mapper.Map<Topic>(topicRequest);

            if (await _topicRepository.GetByNameAsync(topic.Name!) is not null)
            {
                throw new ConflictException("Topic already exists.");
            }

            var addedTopic = await _topicRepository.AddAsync(topic);

            return _mapper.Map<TopicView>(addedTopic);
        }

        public async Task DeleteTopicAsync(Guid topicId, TopicRequest topicRequest)
        {
            var topic = await GetExistingEntityById(topicId);
            
            var result = await _topicRepository.DeleteAsync(topic);

            if (!result)
            {
                throw new ServerErrorException("Can't delete this topic.", null);
            }
        }

        public async Task DeleteByTopicIdAsync(Guid topicId)
        {
            var result = await _topicRepository.DeleteByIdAsync(topicId);

            if (!result)
            {
                throw new ServerErrorException("Can't delete this topic.", null);
            }
        }

        public async Task UpdateTopicAsync(Guid topicId, TopicRequest topicRequest)
        {
            var topic = await GetExistingEntityById(topicId);
            _mapper.Map(topicRequest, topic);

            var result = await _topicRepository.UpdateAsync(topic);

            if (!result)
            {
                throw new ServerErrorException("Can't update this topic.", null);
            }
        }
        
        public async Task<PostStatistics> GetPostsStatisticsByTopic(Guid topicId)
        {
            var statistics = new PostStatistics()
            {
                PostCount = await _postRepository.CountPostsAsync(topicId),
                LastMessageTime = (await _postRepository.GetLastPostAsync(topicId)).DatePosted,
            };

            return statistics;
        }
    }
}