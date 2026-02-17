using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SpotifyDotNet.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);



// Configure Entity Framework and Database Connection
builder.Services.AddDbContext<SpotifyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Identity
//builder.Services.AddDefaultIdentity<IdentityUser>(options =>
//{
//    options.Password.RequireDigit = true;
//    options.Password.RequiredLength = 8;
//    options.Password.RequireNonAlphanumeric = true;
//    options.Password.RequireUppercase = true;
//    options.Lockout.MaxFailedAccessAttempts = 5;
//    options.User.RequireUniqueEmail = true;
//})
//.AddEntityFrameworkStores<SpotifyDbContext>();

// Add services to the container.
builder.Services.AddControllersWithViews();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();
// Configure authentication & authorization
app.UseAuthentication();
app.UseAuthorization();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
