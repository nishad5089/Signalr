namespace SingleIr.API.Models
{
    public class ChatMessage
    {
        public int id {get; set;}
        public string user { get; set; }

		public string message { get; set; }

		public string room { get; set; }
    }
}