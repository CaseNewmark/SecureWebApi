using TodoBackend.Authentication;
using TodoBackend.Controllers;
using TodoBackend.Services;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddKeycloakAuthentication(configuration);

builder.Services.AddSingleton<IHeartProvider, HeartProvider>();
builder.Services.AddHostedService(p => (HeartProvider)p.GetRequiredService<IHeartProvider>());

builder.Services.AddCors(o =>
    o.AddPolicy("CorsPolicy",
        builder => builder
            .AllowAnyHeader()
            .AllowAnyOrigin()
            .AllowCredentials()
            .WithOrigins("http://localhost:4200")));
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("CorsPolicy");

app.MapControllers();
app.MapHub<HeartbeatHub>("/heartbeat");

app.Run();
