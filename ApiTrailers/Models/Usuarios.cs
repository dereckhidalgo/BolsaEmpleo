using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBolsaEmpleo.Models
{
    public class Usuarios
    {
        [Key]
        public int ID { get; set; }
        public string NOMBRE { get; set; }
        public string APELLIDO { get; set; }
        public Nullable<System.DateTime> FECHA_NACIMIENTO { get; set; }
        public string DIRECCION { get; set; }
        public string NUMERO_TEL { get; set; }
        public string BIOGRAFIA { get; set; }
        public string CORREO { get; set; }
        public string CONTRA { get; set; }
        public string URL_IMG_PERFIL { get; set; }
        public Nullable<int> ID_ROL_Fk { get; set; }

    }
}
