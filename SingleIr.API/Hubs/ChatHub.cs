using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SingleIr.API.Models;

namespace SingleIr.API.Hubs
{
    public class ChatHub : Hub
    {


        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("ReceiveSystemMessage", $"{Context.UserIdentifier} left.");
            await base.OnDisconnectedAsync(exception);
        }
          public async Task SendMessage(ChatMessage message)  
        {  
            await Clients.All.SendAsync("ReceiveMessage", message);  
        }  
    }
}