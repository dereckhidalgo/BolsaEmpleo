import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
function Admin() {
    return (
      <>
      <img src="img/admin.png" height="150" width="150" />
      <div class="row">
    <div class="col-md-4">
        <h2>Todos los documentos </h2>
        <img src="~/Fotos/Documents-(1).jpg" height="150" width="150" />
        @*<p>
            En este apartado podremos manejar todo lo referente a los usuarios.

        </p>*@
        <br />
        <button>@Html.ActionLink("Ir al Filtro", "ListaDoc", "Documento") </button>
    </div>
    <div class="col-md-4">
        <h2>Generados por empleado</h2>
        <img src="~/Fotos/usuario.png" height="150" width="150"/>
        @*<p>
            En este apartado podremos manejar todo lo referente a los Departamentos.
        </p>*@
        <br />
        <button>@Html.ActionLink("Ir al Filtro", "ReporteDocporUsuario", "Reporte") </button>
    </div>
</div>
      </>
    );
  }
  
  export default Admin;
  