using System.Net;

namespace ForumWebProject.Application.Exceptions;

public class NotFoundException : CustomException
{
    public NotFoundException(string message) : base(message, null, HttpStatusCode.NotFound)
    {
    }
}