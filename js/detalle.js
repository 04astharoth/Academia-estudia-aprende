$(document).ready(function () {

  //declaracion de variables
  var eventos;

  $.ajax({
    url: "info.json"
  }).done(function (peticion) {
    //Guarda el resultado en una variable
    eventos = peticion.eventos;
    console.log(peticion.xhr);
    //obteniendo el id del url
    var id = location.search.match(/id=(\d)*/)[1];
    //Busca el elemento en el arreglo
    var evento = eventos.find(function (element) {
      return element.id == id
    });
    //Crea un string que contenga el HTML que describe el detalle del evento
    var html = "";
    //Modifica el DOM agregando el html generado dentro del div con id=evento
    html = `<div class="col">
            <div class="p-3 border bg-light rounded">
            <h2>${evento.nombre}</h2>
            <p class="text-black-50">${evento.fecha} - ${evento.lugar}</p>
            <p>${evento.descripcion}</p>
            <p class="text-info">Costo: ${evento.precio}</p>
            <p class="text-warning">Invitados: ${evento.invitados}</p>
            </div>
            </div>`;

    document.getElementById("evento").innerHTML = html
  });
});
