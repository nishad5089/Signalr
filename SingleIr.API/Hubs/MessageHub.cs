using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SingleIr.API.Hubs
{
     
    public class MessageHub : Hub
    {
        public Task Send(string message)
        {
            return Clients.All.SendAsync("Send", message);
        }
    }
}