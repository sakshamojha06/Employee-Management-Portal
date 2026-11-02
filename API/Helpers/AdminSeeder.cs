using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers;

public static class AdminSeeder
{
    public static async Task SeedAdminAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();

        var context = scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

        var passwordHasher = scope.ServiceProvider
            .GetRequiredService<IPasswordHasher<User>>();

        bool adminExists = await context.Users
            .AnyAsync(u => u.Role == "Admin");

        if (adminExists)
        {
            return;
        }

        var admin = new User
        {
            FullName = "Admin",
            Email = "admin@employee.com",
            Role = "Admin"
        };

        admin.PasswordHash = passwordHasher.HashPassword(
            admin,
            "Admin@123"
        );

        context.Users.Add(admin);

        await context.SaveChangesAsync();
    }
}
