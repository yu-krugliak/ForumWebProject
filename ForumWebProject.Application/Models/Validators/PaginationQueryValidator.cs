using FluentValidation;
using ForumWebProject.Application.Models.Queries;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Infrastructure.Repositories.Interfaces;

namespace ForumWebProject.Application.Models.Validators;

public class PaginationQueryValidator : CustomValidator<PaginationQuery>
{
    public PaginationQueryValidator()
    {
        RuleFor(p => p.Count)
            .GreaterThan(0)
            .WithMessage("Counter must have positive value")
            .LessThanOrEqualTo(30)
            .WithMessage("Counter must be less than or equal to 30");

        RuleFor(p => p.Offset)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Offset must have positive value");
    }
}