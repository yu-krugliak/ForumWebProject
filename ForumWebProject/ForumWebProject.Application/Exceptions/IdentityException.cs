using System.Net;
using Microsoft.AspNetCore.Identity;

namespace ForumWebProject.Application.Exceptions
{
    public class IdentityException : CustomException
    {
        private readonly IdentityResult _result;
        private List<string>? _errorMessages;

        public override List<string> ErrorMessages =>
            _errorMessages ??= _result.Errors.Select(e => e.Description).ToList();

        public IdentityException(string message, IdentityResult result) 
            : base(message, null, HttpStatusCode.BadRequest)
        {
            _result = result;
        }
    }
}
