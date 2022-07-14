using FluentValidation;
using ForumWebProject.Application.Models.Requests;

namespace ForumWebProject.Application.Models.Validators;

public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator()
    {
        RuleFor(r => r.Password)
            .NotEmpty()
            .WithMessage("Password can't be empty.")
            .MinimumLength(6)
            .WithMessage("Password must have at least 6 characters.");

        RuleFor(r => r.ConfirmPassword)
            .Equal(r => r.Password)
            .WithMessage("Passwords can't be different.");
    }
}