function limpiarErrores() {
  var errores = document.getElementsByClassName("text-danger");
  for (var i = 0; i < errores.length; i++) {
    errores[i].innerHTML = "";
  }
}
function validar(formulario) {
  limpiarErrores();
  var nombres = formulario.nombres.value.trim().length;
  var contrasena = formulario.contrasena.value.trim().length;
  //Expresion regular del correo
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var todoOK = true; // token que permite el envio de datos del fomulario
  if (nombres < 3) {
    document.getElementById("errornombres").innerText = "Este Campo es Obligatorio";
    formulario.nombres.focus();
    todoOK = false;
  }
  if (!re.test(formulario.email.value)) {
    document.getElementById("errorEmail").innerText = "El correo ingresado no es valido.";
    formulario.email.focus();
    todoOK = false;
  }
  if (contrasena < 7) {
    document.getElementById("errorContrasena").innerText = "Debe tener almenos 7 caracteres.";
    formulario.contrasena.focus();
    todoOK = false;
  }
  if (formulario.contrasena.value != formulario.confirmacion.value) {
    document.getElementById("errorConfirmacion").innerText = "No coincide con la contraseña.";
    formulario.confirmacion.focus();
    todoOK = false;
  }
  if (formulario.tipo.value == -1) {
    document.getElementById("errorTipo").innerText = "Este Campo es obligatorio.";
    todoOK = false;
  }
  if (!formulario.acepto.checked) {
    document.getElementById("errorAcepto").innerText = "Debe aceptar los Terminos y Condiciones.";
    todoOK = false;
  }
  if (todoOK){alert("Datos enviados");} // si el token es true, el formulario se envia
  return todoOK;
}