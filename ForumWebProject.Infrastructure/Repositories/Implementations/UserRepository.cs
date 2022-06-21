using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Identity;
using ForumWebProject.Infrastructure.Repositories.Interfaces;

namespace ForumWebProject.Infrastructure.Repositories.Implementations
{
    internal class UserRepository : RepositoryBase<User>, IUserRepository
    {
        private readonly ForumContext _forumContext;

        public UserRepository(ForumContext forumContext) : base(forumContext)
        {
            _forumContext = forumContext;
        }
    }
}
