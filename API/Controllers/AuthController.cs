using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        try
        {
            await _authService.RegisterAsync(request);

            return Ok(new { message = "User registered successfully." });
        }
        catch (Exception ex)
        {
            if(ex.Message == "Email is already registered.")
            {
                return Conflict(new { message = ex.Message });
            }
            return StatusCode(500, new { message = "Something went wrong. "});
        }
    }
}