using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SingleIr.API.Data;
using SingleIr.API.Hubs;
using SingleIr.API.Models;

namespace SingleIr.API.Controllers {
    [Route ("api/[controller]")]
    //  [ApiController]
    public class EmployeeController : Controller {
        private readonly EmployeeDbContext _context;

        private readonly IHubContext<EmployeeHub> _employeeHub;

        public EmployeeController (EmployeeDbContext context, IHubContext<EmployeeHub> employeeHub) {
           
            _context = context;
            _employeeHub = employeeHub;
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<IActionResult> GetEmployees () {
            return Ok (await _context.Employees.ToListAsync ());
        }
        // POST: api/Employee
        [HttpPost]
        public async Task<IActionResult> PostEmployeeItem ([FromBody] Employee employee) {
            _context.Employees.Add (employee);
            await _context.SaveChangesAsync ();
            await _employeeHub.Clients.All.SendAsync ("send", employee);
            return CreatedAtAction ("GetEmployeeItem", new { id = employee.Id }, employee);
        }

        // PUT: api/Todo/5
        [HttpPut ("{id}")]
        public async Task<IActionResult> PutEmployeeItem (int id, [FromBody] Employee employee) {
            if (id != employee.Id) {
                return BadRequest ();
            }

            _context.Entry (employee).State = EntityState.Modified;
            await _context.SaveChangesAsync ();

            return NoContent ();
        }

        // GET: api/Todo/5
        [HttpGet ("{id}")]
        public async Task<IActionResult> GetEmployeeItem (int id) {
            var todoItem = await _context.Employees.FindAsync (id);

            if (todoItem == null) {
                return NotFound ();
            }

            return Ok (todoItem);
        }
        // DELETE: api/Todo/5
        [HttpDelete ("{id}")]
        public async Task<IActionResult> DeleteTodoItem (int id) {
            var employeeItem = await _context.Employees.FindAsync (id);
            if (employeeItem == null) {
                return NotFound ();
            }

            _context.Employees.Remove (employeeItem);
            await _context.SaveChangesAsync ();

            return Ok ();
        }
    }
}