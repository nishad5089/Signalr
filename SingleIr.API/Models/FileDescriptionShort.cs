using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace SingleIr.API.Models
{
    public class FileDescriptionShort
    {
         public int Id { get; set; }
 
    public string Description { get; set; }
 
    public string Name { get; set; }
 
    public ICollection<IFormFile> File { get; set; }
    }
}