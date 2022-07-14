using FluentValidation;
using ForumWebProject.Application.Models.Requests;
using ForumWebProject.Application.Services.Interfaces;
using ForumWebProject.Infrastructure.Repositories.Interfaces;

namespace ForumWebProject.Application.Models.Validators;

public class CategoryRequestValidator : CustomValidator<CategoryRequest>
{
    public CategoryRequestValidator(ICategoryRepository categoryRepository)
    {
        RuleFor(r => r.ParentCategoryId)
            .MustAsync(async (r, _) => await categoryRepository.ExistsAsync(r!.Value))
            .When(r => r.ParentCategoryId is not null)
            .WithMessage("Parent category doesn't exists.");
    }
}