using ForumWebProject.Application.Auth;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Application.Exceptions;
using ForumWebProject.Application.Models;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using Mapster;
using MapsterMapper;

namespace ForumWebProject.Application.Services.Implementations
{
    public class PostService : ServiceBase<Post>, IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUser _currentUser;

        public PostService(IPostRepository postRepository, IMapper mapper, ICurrentUser currentUser) : base(postRepository)
        {
            _postRepository = postRepository;
            _mapper = mapper;
            _currentUser = currentUser;
        }
        
        public async Task<IEnumerable<PostView>> GetAllPostsAsync()
        {
            var posts = await _postRepository.GetAllAsync();

            if (posts is null)
            {
                throw new NotFoundException("Posts not found.");
            }
            
            var postsViews = _mapper.Map<IEnumerable<PostView>>(posts);
            return postsViews;
        }

        public async Task<IEnumerable<PostView>> GetAllPostsByTopicIdAsync(Guid topicId)
        {
            var posts = await _postRepository.GetByTopicId(topicId);

            if (posts is null)
            {
                throw new NotFoundException("Posts in this topic not found.");
            }
            
            var postViews = _mapper.Map<IEnumerable<PostView>>(posts);
            return postViews;
        }

        public async Task<IEnumerable<PostView>> GetAllPostsByUserId(Guid userId)
        {
            var posts = await _postRepository.GetByUserId(userId);

            if (posts is null)
            {
                throw new NotFoundException("Posts for this user not found.");
            }
            
            var postViews = _mapper.Map<IEnumerable<PostView>>(posts);
            return postViews;
        }

        public async Task<PostView> GetPostByIdAsync(Guid postId)
        {
            var post = await GetExistingEntityById(postId);

            var postView = _mapper.Map<PostView>(post);
            return postView;
        }

        public async Task<PostView> AddPostAsync(PostRequest postRequest)
        {
            var post = _mapper.Map<Post>(postRequest);
            post.UserIdCreated = Guid.Parse(_currentUser.GetUserId());
            post.DatePosted = DateTime.UtcNow;
            
            var addedPost = await _postRepository.AddAsync(post);

            if (addedPost is null)
            {
                throw new ServerErrorException("Can't add this post.", null);
            }

            return _mapper.Map<PostView>(addedPost);
        }

        public async Task DeletePostAsync(Guid postId, PostRequest postRequest)
        {
            var post = await GetExistingEntityById(postId);

            var result = await _postRepository.DeleteAsync(post);

            if (!result)
            {
                throw new ServerErrorException("Can't delete this post.", null);
            }
        }

        public async Task DeleteByPostIdAsync(Guid postId)
        {
            var result = await _postRepository.DeleteByIdAsync(postId);

            if (!result)
            {
                throw new ServerErrorException("Can't delete this post.", null);
            }
        }

        public async Task UpdatePostAsync(Guid postId, PostRequest postRequest)
        {
            var post = await GetExistingEntityById(postId);
            _mapper.Map(postRequest, post);

            var result = await _postRepository.UpdateAsync(post);

            if (!result)
            {
                throw new ServerErrorException("Can't update this post.", null);
            }
        }

        public async Task<IEnumerable<PostView>> FindPostsByContainingText(string textFilter)
        {
            var posts = await _postRepository.FindByContainingText(textFilter);

            if (posts is null)
            {
                throw new NotFoundException("Posts which contain this text not found.");
            }
            
            var postViews = _mapper.Map<IEnumerable<PostView>>(posts);
            return postViews;
        }

        public async Task<IEnumerable<PostView>> FindPostsByDatePeriod(DateTime dateStart, DateTime dateEnd)
        {
            var posts = await _postRepository.FindByDatePeriod(dateStart, dateEnd);

            if (posts is null)
            {
                throw new NotFoundException("Posts in this period of time not found.");
            }
            
            var postViews = _mapper.Map<IEnumerable<PostView>>(posts);
            return postViews;
        }
    }
}
