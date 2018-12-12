using Microsoft.EntityFrameworkCore;
using SingleIr.API.Models;

namespace SingleIr.API.Data
{
    public class EmployeeDbContext : DbContext
    {
         public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options) {}
         public DbSet<Employee> Employees { get; set; }
    }
}