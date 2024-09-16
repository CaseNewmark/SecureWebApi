namespace TodoBackend.Controllers;

public interface IHeartbeatReceiver
{
    Task BumpOccurred(long count);
}
