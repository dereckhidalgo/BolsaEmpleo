using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBolsaEmpleo.Models
{
    public class TipoTrabajo
    {
        [Key]
        public int ID { get; set; }
        public string NOMBRE { get; set; }

    }
}
