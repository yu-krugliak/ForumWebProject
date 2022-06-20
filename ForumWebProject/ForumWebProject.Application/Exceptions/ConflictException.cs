using System.Net;

namespace ForumWebProject.Application.Exceptions;

public class ConflictException : CustomException
{
    public ConflictException(string message) : base(message, null, HttpStatusCode.Conflict)
    {
    }
}