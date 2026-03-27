using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private static List<Todo> _todos = new List<Todo>();

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_todos);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Todo item)
        {
            if (string.IsNullOrWhiteSpace(item.Title))
            {
                return BadRequest("Title is required.");
            }

            item.Id = Guid.NewGuid();
            _todos.Add(item);
            return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] Todo item)
        {
            var existing = _todos.FirstOrDefault(t => t.Id == id);
            if (existing == null)
            {
                return NotFound();
            }

            if (string.IsNullOrWhiteSpace(item.Title))
            {
                return BadRequest("Title is required.");
            }

            existing.Title = item.Title;
            existing.Completed = item.Completed;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var existing = _todos.FirstOrDefault(t => t.Id == id);
            if (existing == null)
            {
                return NotFound();
            }

            _todos.Remove(existing);
            return NoContent();
        }
    }
}
