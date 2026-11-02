using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _service;

    public EmployeeController(IEmployeeService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _service.GetAllAsync();

        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var employee = await _service.GetByIdAsync(id);

        if (employee == null)
        {
            return NotFound(new
            {
                message = "Employee not found."
            });
        }

        return Ok(employee);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Add(EmployeeRequest request)
    {
        var employee = await _service.AddAsync(request);

        return CreatedAtAction(
            nameof(GetById),
            new { id = employee.Id },
            employee
        );
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, EmployeeRequest request)
    {
        var employee = await _service.UpdateAsync(id, request);

        if (employee == null)
        {
            return NotFound(new
            {
                message = "Employee not found."
            });
        }

        return Ok(employee);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        bool deleted = await _service.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound(new
            {
                message = "Employee not found."
            });
        }

        return Ok(new
        {
            message = "Employee deleted successfully."
        });
    }
}
