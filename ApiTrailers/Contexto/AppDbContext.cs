using ApiBolsaEmpleo.Models;
using ApiTrailers.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBolsaEmpleo.Contexto
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {

        }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Categoria> Categoria { get; set; }
        public DbSet<Usuarios> Usuarios { get; set; }
        public virtual DbSet<Postulacion> Postulacion{ get; set; }
        public virtual DbSet<TipoTrabajo> Trabajo { get; set; }
        public virtual DbSet<Vacante> VACANTE { get; set; }
    }
}
