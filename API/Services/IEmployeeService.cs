using API.DTOs;

namespace API.Services;

public interface IEmployeeService
{
    public Task<List<EmployeeResponse>> GetAllAsync();

    public Task<EmployeeResponse?> GetByIdAsync(int id);

    public Task<EmployeeResponse> AddAsync(EmployeeRequest request);

    public Task<EmployeeResponse?> UpdateAsync(int id, EmployeeRequest request);

    public Task<bool> DeleteAsync(int id);
}