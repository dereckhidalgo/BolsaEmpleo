using ApiBolsaEmpleo.Contexto;
using ApiTrailers.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBolsaEmpleo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly AppDbContext context;
        public RolesController(AppDbContext context)
        {
            this.context = context;
        }
        // GET: api/<RolesController>
        [HttpGet]
        public ActionResult Get()
        {
            try 
            { 
                return Ok(context.Roles.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}", Name = "GetRol")]
        // GET api/<RolesController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var gestor = context.Roles.FirstOrDefault(g => g.ID == id);
                return Ok(gestor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<RolesController>
        [HttpPost]
        public ActionResult Post([FromBody] Roles gestor)
        {
            try
            {
                context.Roles.Add(gestor);
                context.SaveChanges();
                return CreatedAtRoute("GetRol", new { id = gestor.ID }, gestor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<RolesController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Roles gestor)
        {
            try
            {
                if (gestor.ID == id)
                {
                    context.Entry(gestor).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetGestor", new { id = gestor.ID }, gestor);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<RolesController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var gestor = context.Roles.FirstOrDefault(g => g.ID == id);
                if (gestor != null)
                {
                    context.Roles.Remove(gestor);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
