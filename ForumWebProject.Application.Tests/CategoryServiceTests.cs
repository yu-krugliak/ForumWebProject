using AutoFixture;
using FluentAssertions;
using ForumWebProject.Application.Exceptions;
using ForumWebProject.Application.Mapster;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Models.Requests;
using ForumWebProject.Application.Models.Views;
using ForumWebProject.Application.Services.Implementations;
using ForumWebProject.Infrastructure.Entities;
using ForumWebProject.Infrastructure.Repositories.Interfaces;
using MapsterMapper;
using NSubstitute;
using NSubstitute.ExceptionExtensions;

namespace ForumWebProject.Application.Tests;

public class CategoryServiceTests
{
    private readonly Fixture _fixture = new();
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;
    private readonly CategoryService _sut;

    public CategoryServiceTests()
    {
        _categoryRepository = Substitute.For<ICategoryRepository>();
        _mapper = Substitute.For<IMapper>();
        _mapper = new Mapper(MapsterConfiguration.GetConfiguration());
        _sut = new(_categoryRepository, _mapper);

        _fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
        _fixture.Behaviors.Add(new OmitOnRecursionBehavior());
    }

    [Fact]
    public async Task GetAllCategoriesAsync_WhenNoErrors_ShouldReturnCategoriesViews()
    {
        // Arrange
        var categories = _fixture.CreateMany<Category>(3).ToList();
        var categoriesViews = _mapper.Map<IEnumerable<CategoryView>>(categories).ToList();
        _categoryRepository.GetAllAsync().Returns(categories);

        // Act
        var result = (await _sut.GetAllCategoriesAsync()).ToList();
        
        // Assert
        await _categoryRepository.Received(1).GetAllAsync();
        result.Should().Equal(categoriesViews, (view1, view2) => view1.Id == view2.Id);
        result.Should().Equal(categoriesViews, (view1, view2) => view1.Name == view2.Name);
        result.Should().Equal(categoriesViews, (view1, view2) => view1.Description == view2.Description);
        result.Should().Equal(categoriesViews, (view1, view2) => view1.ParentCategoryId == view2.ParentCategoryId);
    }
    
    [Fact]
    public async Task GetAllCategoriesByParentIdAsync_WhenNoErrors_ShouldReturnCategoriesViews()
    {
        // Arrange
        var parentId = _fixture.Create<Guid>();
        
        var categories = _fixture.CreateMany<Category>(3).ToList();
        var categoriesViews = _mapper.Map<IEnumerable<CategoryView>>(categories).ToList();
        _categoryRepository.GetByParentIdAsync(Arg.Any<Guid>()).Returns(categories);

        // Act
        var result = (await _sut.GetAllCategoriesByParentIdAsync(parentId)).ToList();
        
        // Assert
        await _categoryRepository.Received(1).GetByParentIdAsync(parentId);
        result.Should().Equal(categoriesViews, (view1, view2) => view1.Id == view2.Id);
        result.Should().Equal(categoriesViews, (view1, view2) => view1.Name == view2.Name);
        result.Should().Equal(categoriesViews, (view1, view2) => view1.Description == view2.Description);
        result.Should().Equal(categoriesViews, (view1, view2) => view1.ParentCategoryId == view2.ParentCategoryId);
    }
    
    [Fact]
    public async Task GetCategoryByIdAsync_WhenExists_ShouldReturnCategoryView()
    {
        // Arrange
        var id = _fixture.Create<Guid>();
        
        var category = _fixture.Create<Category>();
        var categoryView = _mapper.Map<CategoryView>(category);
        _categoryRepository.GetByIdAsync(Arg.Any<Guid>()).Returns(category);

        // Act
        var result = await _sut.GetCategoryByIdAsync(id);
        
        // Assert
        await _categoryRepository.Received(1).GetByIdAsync(id);
        result.Id.Should().Be(categoryView.Id);
        result.Name.Should().Be(categoryView.Name);
        result.Description.Should().Be(categoryView.Description);
        result.ParentCategoryId.Should().Be(categoryView.ParentCategoryId);
    }
    
    [Fact]
    public async Task GetCategoryByIdAsync_WhenNotExists_ShouldThrowNotFound()
    {
        // Arrange
        var id = _fixture.Create<Guid>();
        _categoryRepository.GetByIdAsync(Arg.Any<Guid>()).Returns((Category?)null);
       
        // Act
        Func<Task> act = async () => await _sut.GetCategoryByIdAsync(id);
        
        // Assert
        await act.Should()
            .ThrowAsync<NotFoundException>()
            .WithMessage("Category with such id doesn't exist.");
        
        await _categoryRepository.Received(1).GetByIdAsync(id);
        _mapper.DidNotReceive().Map<CategoryView>(Arg.Any<Category>());
    }
    
    [Fact]
    public async Task AddCategoryAsync_WhenNoErrors_ShouldPassToRepository()
    {
        // Arrange
        var categoryRequest = _fixture.Create<CategoryRequest>();
        var category = _mapper.Map<Category>(categoryRequest);
        var categoryView =_mapper.Map<CategoryView>(category);

        _categoryRepository.AddAsync(Arg.Any<Category>()).Returns(category);

        // Act
        var result = await _sut.AddCategoryAsync(categoryRequest);
        
        // Assert
        result.Should().Be(categoryView);
        await _categoryRepository.Received(1).AddAsync(category);
        _mapper.Received(1).Map<Category>(categoryRequest);
        _mapper.Received(1).Map<CategoryView>(category);
    }
    
    [Fact]
    public async Task DeleteByCategoryIdAsync_WhenCategoryExists_ShouldDontThrowException()
    {
        // Arrange
        var id = _fixture.Create<Guid>();
        _categoryRepository.DeleteByIdAsync(Arg.Any<Guid>()).Returns(true);

        // Act
        await _sut.DeleteByCategoryIdAsync(id);
        
        // Assert
        await _categoryRepository.Received(1).DeleteByIdAsync(id);
    }
    
    [Fact]
    public async Task DeleteByCategoryIdAsync_WhenCategoryNotExists_ShouldThrowNotFoundException()
    {
        // Arrange
        var id = _fixture.Create<Guid>();
        _categoryRepository.DeleteByIdAsync(Arg.Any<Guid>()).Returns(false);

        // Act
        Func<Task> action = async () => await _sut.DeleteByCategoryIdAsync(id);
        
        // Assert
        await action.Should().ThrowAsync<NotFoundException>()
            .WithMessage("This Category doesn't exist.");
        await _categoryRepository.Received(1).DeleteByIdAsync(id);
    }
    
    [Fact]
    public async Task UpdateCategoryAsync_WhenCategoryExists_ShouldUpdate()
    {
        // Arrange
        var id = _fixture.Create<Guid>();
        var categoryRequest = _fixture.Create<CategoryRequest>();
        var category = _fixture.Create<Category>();
        _categoryRepository.GetByIdAsync(Arg.Any<Guid>()).Returns(category);
        _categoryRepository.UpdateAsync(Arg.Any<Category>()).Returns(true);
        _mapper.Map(Arg.Any<CategoryRequest>(), Arg.Any<Category>())
            .Returns(info =>
            {
                var requestArg = (CategoryRequest)info[0];
                var categoryArg = (Category)info[1];
                categoryArg.Name = requestArg.Name;
                categoryArg.Description = requestArg.Description;
                categoryArg.ParentCategoryId = requestArg.ParentCategoryId;
                return categoryArg;
            });

        // Act
        await _sut.UpdateCategoryAsync(id, categoryRequest);
        
        // Assert
        await _categoryRepository.Received(1).DeleteByIdAsync(id);
    }
}