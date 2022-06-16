using System.Net;

namespace ForumWebProject.Application.Exceptions;

public class CustomException : Exception
{
    public List<string>? ErrorMessages { get; }
    
    public HttpStatusCode StatusCode { get; }

    public CustomException(string message, List<string>? errorMessages, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
        : base(message)
    {
        ErrorMessages = errorMessages;
        StatusCode = statusCode;
    }
}