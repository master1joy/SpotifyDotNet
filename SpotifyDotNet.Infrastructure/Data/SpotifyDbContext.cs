using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SpotifyDotNet.Infrastructure.Entities;


namespace SpotifyDotNet.Infrastructure.Data
{
    public class SpotifyDbContext: DbContext
    {
        private readonly IConfiguration _configuration;
        public SpotifyDbContext(DbContextOptions<SpotifyDbContext> options):base(options) 
        {
        }

        //Define your DbSets(Tables) here
        public DbSet<User> Users { get; set; }

        
    }
}
