namespace ForumWebProject.Application.Models.Queries;

public class PaginationQuery
{
    public int? Offset { get; set; } = 0;
    public int? Count { get; set; } = 10;
}