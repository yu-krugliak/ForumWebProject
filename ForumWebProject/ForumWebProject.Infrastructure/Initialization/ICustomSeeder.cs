﻿namespace ForumWebProject.Infrastructure.Initialization;

public interface ICustomSeeder
{
    Task InitializeAsync(CancellationToken cancellationToken);
}