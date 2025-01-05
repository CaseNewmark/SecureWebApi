using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TodoBackend.Services;

namespace TodoBackend.Controllers;

public class HeartbeatHub : Hub<IHeartbeatReceiver>
{
    public event EventHandler? HeartbeatOccurred;

    public HeartbeatHub() 
    {
    }

    public async Task Bump(long count)
    {
        await Clients.All.BumpOccurred(count);
    }

    public Task Reset([FromServices]IHeartProvider heart)
    {
        heart.Reset();
        return Task.CompletedTask;
    }

    public override async Task OnConnectedAsync()
    {
        Console.WriteLine(Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? ex)
    {
        Console.WriteLine(Context.ConnectionId);
        await base.OnDisconnectedAsync(ex);
    }
}
