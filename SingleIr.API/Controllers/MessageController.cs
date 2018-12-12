using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SingleIr.API.Hubs;

namespace SingleIr.API.Controllers
{
   
    [Route("api/[controller]")]
    public class MessageController : Controller
    { private IHubContext<MessageHub> _MessageHub; 

        public MessageController(IHubContext<MessageHub> messageHub )
        {
            _MessageHub = messageHub;
        }

       
        [HttpPost]
         public IActionResult Post(){
             _MessageHub.Clients.All.SendAsync("send","hellow world");
             
            return Ok();
        }
    }
}