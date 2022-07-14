using System.Net;
using System.Net.Http.Headers;
using System.Text;
using AutoFixture;
using FluentAssertions;
using ForumWebProject.Application.Models;
using ForumWebProject.Application.Models.Requests;
using ForumWebProject.Application.Models.Views;
using ForumWebProject.Infrastructure.Context;
using ForumWebProject.Infrastructure.Entities;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace ForumWebProject.Api.IntegrationTests;

public class CategoryEndpointTests : IClassFixture<ApplicationFactory<Program>>
{
    private readonly ApplicationFactory<Program> _factory;
    private readonly Fixture _fixture;

    public CategoryEndpointTests(ApplicationFactory<Program> factory)
    {
        _factory = factory;
        _fixture = new();

        _fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
        _fixture.Behaviors.Add(new OmitOnRecursionBehavior());

        
    }

    [Fact]
    public async Task CreateAndGetCategory()
    {
        // Arrange
        var client = _factory.CreateClient();

        var category = new CategoryRequest("Name09269747-281b-44ad-96af-764a59caf5cc",
            "Descriptione3e7fa60-792d-4c26-9cf4-80a69b834267", null);
        
        await AuthorizeClientAsync(client);

        // Act
        var createdCategory =
            await PostRequestAsync<CategoryView, CategoryRequest>(client, HttpStatusCode.Created, "/api/Categories",
                category);
        
        // Assert
        var categoryById =
            await GetRequestAsync<CategoryView>(client, HttpStatusCode.OK, $"/api/Categories/{createdCategory.Id}");
        categoryById.Id.Should().Be(createdCategory.Id);
        categoryById.Name.Should().Be(createdCategory.Name);
        categoryById.Description.Should().Be(createdCategory.Description);
        categoryById.ParentCategoryId.Should().Be(createdCategory.ParentCategoryId);
    }
    
    [Fact]
    public async Task CreateAndDeleteCategory()
    {
        // Arrange
        var client = _factory.CreateClient();

        var category = new CategoryRequest("Name09269747-281b-44ad-96af-764a59caf5cc",
            "Descriptione3e7fa60-792d-4c26-9cf4-80a69b834267", null);
        
        await AuthorizeClientAsync(client);

        // Act
        var createdCategory =
            await PostRequestAsync<CategoryView, CategoryRequest>(client, HttpStatusCode.Created, "/api/Categories",
                category);
        await DeleteRequestAsync(client, HttpStatusCode.OK, $"/api/Categories/{createdCategory.Id}");
        
        // Assert
        var categoryById =
            await GetRequestAsync<CategoryView>(client, HttpStatusCode.NotFound, $"/api/Categories/{createdCategory.Id}");
    }

    private static async Task<T> GetRequestAsync<T>(HttpClient client, HttpStatusCode expectedStatusCode, string uri)
    {
        var responseMessage = await client.GetAsync(uri);

        var content = await responseMessage.Content.ReadAsStringAsync();

        responseMessage.StatusCode.Should().Be(expectedStatusCode, content);
        var responseObject = JsonConvert.DeserializeObject<T>(content)!;
        return responseObject;
    }

    private static async Task<T> PostRequestAsync<T, TR>(HttpClient client, HttpStatusCode expectedStatusCode,
        string uri, TR body)
    {
        var response = await client.PostAsync(uri,
            new StringContent(JsonConvert.SerializeObject(body), Encoding.Default, "application/json"));
        
        var content = await response.Content.ReadAsStringAsync();
        response.StatusCode.Should().Be(expectedStatusCode, content);
        var responseObject = JsonConvert.DeserializeObject<T>(content)!;
        return responseObject;
    }
    
    private static async Task DeleteRequestAsync(HttpClient client, HttpStatusCode expectedStatusCode,
        string uri)
    {
        var response = await client.DeleteAsync(uri);
        response.StatusCode.Should().Be(expectedStatusCode);
    }

    private static async Task AuthorizeClientAsync(HttpClient client)
    {
        var tokenRequest = new TokenRequest("sadpepe@gmail.com", "secure");
        var tokenResponse = await client.PostAsync("/api/Token",
            new StringContent(JsonConvert.SerializeObject(tokenRequest), Encoding.Default, "application/json"));
        var token = JsonConvert.DeserializeObject<TokenView>(
            await tokenResponse.Content.ReadAsStringAsync());
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.Token);
    }
}