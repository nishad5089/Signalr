using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SingleIr.API.Models;

namespace SingleIr.API.Hubs
{
    public class EmployeeHub : Hub
    {
           public Task Send(Employee message)
        {
          //   Clients.All.SendAsync("send","hellow");
       // Clients.All.SendAsync("dd",Context.ConnectionId);

            return Clients.All.SendAsync("Send", message);
        }
    }
}