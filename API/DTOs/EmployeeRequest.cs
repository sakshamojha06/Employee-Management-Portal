using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class EmployeeRequest
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string Bio { get; set; } = string.Empty;
}