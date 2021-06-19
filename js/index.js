$(document).ready(function () {
  // Funcion para ordenar los eventos
  function organizarEventos(eventos, fechaReferencia) {
    //Clasifica los eventos segun la fecha actual del JSON
    var e_pasados = eventos.filter(e => new Date(e.fecha).getTime() <= new Date(fechaReferencia).getTime());
    var e_futuros = eventos.filter(e => new Date(e.fecha).getTime() >= new Date(fechaReferencia).getTime());
    //Ordena los eventos segun la fecha (los mas cercanos primero)
    e_pasados = e_pasados.sort((a, b) => {
      if (new Date(a.fecha).getTime() > new Date(b.fecha).getTime()) {
        return -1; // devuelve -1 para ordenar del mas reciente al mas antiguo
      }
      if (new Date(a.fecha).getTime() < new Date(b.fecha).getTime()) {
        return 1;
      }
      return 0;
    });

    e_futuros = e_futuros.sort((a, b) => {
      if (new Date(a.fecha).getTime() > new Date(b.fecha).getTime()) {
        return 1; // devuelve 1 para ordenar del mas reciente al mas lejano
      }
      if (new Date(a.fecha).getTime() < new Date(b.fecha).getTime()) {
        return -1;
      }
      return 0;
    });

    return [e_futuros, e_pasados];
  }
  //Define las variables que necesites
  var eventos, resultado, fechaActual, eventosPasados, eventosProximos;
  var html = "";
  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    url: "http://127.0.0.1:5500/info.json"
  }).done(function (peticion) {
    //Guarda el resultado en variables
    eventos = peticion.eventos;
    fechaActual = peticion.fechaActual;
    //obteniendo los eventos clasificados y ordenados
    resultado = organizarEventos(eventos, new Date(fechaActual));
    //Extrae solo dos eventos de cada tipo
    eventosPasados = [resultado[1][0], resultado[1][1]];
    eventosProximos = [resultado[0][0], resultado[0][1]];
    //Recorre el arreglo y concatena el HTML para cada evento
    eventosPasados.forEach(e => {
      //Crea un string que contenga el HTML que describe el detalle del evento
      html += `<div class="col">
                  <div class="p-3 border bg-light rounded">
                  <h2><a href="detalle.html?id=${e.id}">${e.nombre}</a></h2>
                  <p class="text-black-50">${e.fecha}</p>
                  <p>${e.descripcion}</p>
                  </div>
               </div>`;
    });
    //Modifica el DOM agregando el html generado
    document.getElementById("pasados").innerHTML = html;
    html = "" // se inicializa de nuevo la variable para los otros eventos
    eventosProximos.forEach(e => {
      //Crea un string que contenga el HTML que describe el detalle del evento
      html += `<div class="col">
                  <div class="p-3 border bg-light rounded">
                  <h2><a href="detalle.html?id=${e.id}">${e.nombre}</a></h2>
                  <p class="text-black-50">${e.fecha}</p>
                  <p>${e.descripcion}</p>
                  </div>
               </div>`;
    });
    //Modifica el DOM agregando el html generado
    document.getElementById("proximos").innerHTML = html;
  });
});
