using API.Models;

namespace API.Repositories;

public interface IEmployeeRepository
{
    public Task<List<Employee>> GetAllAsync();
    public Task<Employee?> GetByIdAsync(int id);
    public Task<Employee> AddAsync(Employee employee);
    public Task<Employee> UpdateAsync(Employee employee);
    public Task<bool> DeleteAsync(int id);
}
    