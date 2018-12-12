using Microsoft.EntityFrameworkCore;
using SingleIr.API.Models;

namespace SingleIr.API.Data
{
    public class ChatDbContext : DbContext
    {
         public ChatDbContext(DbContextOptions<ChatDbContext> options) : base(options) {}
                // public DbSet<Employee> chat { get; set; }

    }
}