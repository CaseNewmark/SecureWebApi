using Microsoft.AspNetCore.SignalR;
using TodoBackend.Controllers;

namespace TodoBackend.Services;

public interface IHeartProvider
{
    void Reset();
}

public class HeartProvider : BackgroundService, IHeartProvider
{
    private readonly IHubContext<HeartbeatHub, IHeartbeatReceiver> _context;
    private long _count = 0;

    public HeartProvider(IHubContext<HeartbeatHub, IHeartbeatReceiver> context)
    {
        _context = context;
    }

    public void Reset()
    {
        _count = 0;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _count++;
            await _context.Clients.All.BumpOccurred(_count);

            await Task.Delay(TimeSpan.FromSeconds(1));
        }
    }
}
