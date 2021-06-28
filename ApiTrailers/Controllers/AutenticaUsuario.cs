using ApiBolsaEmpleo.Contexto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBolsaEmpleo.Controllers
{

    [Route("api/autentica")]
    [ApiController]
    public class AutenticaUsuario : Controller
    {

        public const String FALLIDO = "NON-SUCCESS";
        public const String REALIZADO = "SUCCESS";
        
        private readonly AppDbContext context;
        public AutenticaUsuario(AppDbContext context)
        {
            this.context = context;
        }

        // GET: AutenticaUsuario
        [HttpGet]
        public ActionResult Index()
        {
            return Ok("Echo");
        }

        // GET: autentica/correo/contra
        [HttpGet("{correo}/{contra}")]
        public ActionResult Autentica(string correo, string contra) //INICIAR SESION
        {
            String mensaje_err = "{'STATUS': 'NON-SUCCESS'}";
            String mensaje_succss = "{'STATUS': 'SUCCESS'}";

            try
            {
                var usuario = this.context.Usuarios.FirstOrDefault(u => u.CORREO == correo
            && u.CONTRA == contra);

                if (usuario != null)
                {
                    HttpContext.Session.SetString(correo, correo); // CREAR LA SESSION
                    return Ok(mensaje_succss);
                }
                else
                {
                    return Ok(mensaje_err);
                }

            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet("validasesion/{correo}")]  //VALIDAMOS SI LA SESION SE HA CREADO
        public ActionResult ValidaSesion(string correo) //DEVUELVE TRUE SI EL USUARIO ESTA AUTENTICADO
        {
            try
            {
                String session = HttpContext.Session.GetString(correo);

                if(session == null)
                {
                    return Ok("FALSE"); //LA SESION ESTA INICIADA(EL USUARIO NO HA INICIADO SESSION)
                }
                else
                {
                    return Ok("TRUE");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("cierrasesion/{correo}")]
        public ActionResult cierraSesion(String correo)
        {
            try
            {
                HttpContext.Session.Remove(correo);
                return Ok(REALIZADO);

            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // POST: autentica/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
