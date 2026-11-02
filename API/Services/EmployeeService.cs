using API.DTOs;
using API.Models;
using API.Repositories;

namespace API.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repository;

    public EmployeeService(IEmployeeRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<EmployeeResponse>> GetAllAsync()
    {
        var employees = await _repository.GetAllAsync();

        return employees.Select(e => new EmployeeResponse
        {
            Id = e.Id,
            Name = e.Name,
            Bio = e.Bio
        }).ToList();
    }

    public async Task<EmployeeResponse?> GetByIdAsync(int id)
    {
        var employee = await _repository.GetByIdAsync(id);

        if (employee == null)
        {
            return null;
        }

        return new EmployeeResponse
        {
            Id = employee.Id,
            Name = employee.Name,
            Bio = employee.Bio
        };
    }

    public async Task<EmployeeResponse> AddAsync(EmployeeRequest request)
    {
        var employee = new Employee
        {
            Name = request.Name,
            Bio = request.Bio
        };

        var addedEmployee = await _repository.AddAsync(employee);

        return new EmployeeResponse
        {
            Id = addedEmployee.Id,
            Name = addedEmployee.Name,
            Bio = addedEmployee.Bio
        };
    }

    public async Task<EmployeeResponse?> UpdateAsync(int id, EmployeeRequest request)
    {
        var employee = await _repository.GetByIdAsync(id);

        if (employee == null)
        {
            return null;
        }

        employee.Name = request.Name;
        employee.Bio = request.Bio;

        var updatedEmployee = await _repository.UpdateAsync(employee);

        return new EmployeeResponse
        {
            Id = updatedEmployee.Id,
            Name = updatedEmployee.Name,
            Bio = updatedEmployee.Bio
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}
