using ForumWebProject.Application.Exceptions;
using ForumWebProject.Application.Models;
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
        private readonly IMapper _mapper;
        public TopicService(ITopicRepository topicRepository, IMapper mapper) : base(topicRepository)
        {
            _topicRepository = topicRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TopicView>> GetAllTopicsAsync()
        {
            var topics = await _topicRepository.GetAllAsync();

            if (topics is null)
            {
                throw new NotFoundException("Topics not found.");
            }

            var topicsViews = _mapper.Map<IEnumerable<TopicView>>(topics);
            return topicsViews;
        }

        public async Task<IEnumerable<TopicView>> GetAllTopicsByCategoryIdAsync(Guid topicId)
        {
            var topics = await _topicRepository.GetByCategoryId(topicId);

            if (topics is null)
            {
                throw new NotFoundException("Topics in this category not found.");
            }

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

            if (addedTopic is null)
            {
                throw new ServerErrorException("Can't add this topic.", null);
            }

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
            topic = _mapper.Map<Topic>(topicRequest);
            
            var result = await _topicRepository.UpdateAsync(topic);

            if (!result)
            {
                throw new ServerErrorException("Can't update this topic.", null);
            }
        }
    }
}