using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiTrailers.Models
{
    public class Roles
    {
        [Key]
        public int ID { get; set; }
        public string NOMBRE { get; set; }
    }
}
