using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBolsaEmpleo.Models
{
    public class Postulacion
    {
        [Key]
        public int ID { get; set; }
        public Nullable<int> ID_USUARIO_FK { get; set; }
        public Nullable<int> ID_VACANTE_FK { get; set; }
        public Nullable<System.DateTime> FECHA_POSTULACION { get; set; }

    }
}
