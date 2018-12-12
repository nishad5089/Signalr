using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SingleIr.API.Models;

namespace SingleIr.API.Hubs
{
    public class ImageHub : Hub
    {
        public Task ImageMessage(ImageMessage file)
        {
            return Clients.All.SendAsync("ImageMessage", file);
        }
    }
}