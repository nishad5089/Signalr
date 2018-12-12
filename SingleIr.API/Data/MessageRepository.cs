using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SingleIr.API.Models;

namespace SingleIr.API.Data
{
    public class MessageRepository : IMessageRepository
    {
         private readonly ChatDbContext _context;
        public MessageRepository(ChatDbContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

    //      public async Task<ChatMessage> GetChat(int id)
    //   {
    //     //     // var chat = await _context.chat.FirstOrDefaultAsync(u => u.id == id);

    //     //  //   return chat;
    //     // }

    //     // public async Task<IEnumerable<ChatMessage>> GetChats()
    //     // {
    //     //   var users = await _context.chat.ToListAsync();

    //     //     return users;
    //  }

        public async Task<bool> SaveAll()
        {
           return await _context.SaveChangesAsync() > 0;
        }
    }
}