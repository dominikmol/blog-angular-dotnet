using Microsoft.EntityFrameworkCore;
using BlogAPI.Models;

namespace BlogAPI.Data
{
    public class ApiContext : DbContext
    {
        public DbSet<Articles> Articles { get; set; }
        public ApiContext(DbContextOptions options): base(options)
        {
        }
    }
}
