using System.Net;

namespace ForumWebProject.Application.Exceptions;

public class ServerErrorException : CustomException
{
    public ServerErrorException(string message, List<string>? errorMessages) 
        : base(message, errorMessages, HttpStatusCode.InternalServerError)
    {
    }
}