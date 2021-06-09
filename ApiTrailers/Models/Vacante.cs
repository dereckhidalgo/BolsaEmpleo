using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBolsaEmpleo.Models
{
    public class Vacante
    {
        [Key]
        public int ID { get; set; }
        public string COMPANIA { get; set; }
        public Nullable<int> TIPO { get; set; }
        public string URL_LOGO { get; set; }
        public string URL_O { get; set; }
        public string POSICION { get; set; }
        public string UBICACION { get; set; }
        public Nullable<int> ID_CATEGORIA_FK { get; set; }
        public string DESCRIPCION { get; set; }
        public Nullable<System.DateTime> FECHA_PUBLICACION { get; set; }

    }
}
