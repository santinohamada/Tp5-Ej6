class Cronometro {
  constructor(horas, minutos, segundos, milisegundos) {
    this.horas = horas;
    this.minutos = minutos;
    this.segundos = segundos;
    this.milisegundos = milisegundos;
  }
  ajusteTiempo() {
    let Index = document.querySelector("h2");
    let horasIndex = this.horas;
    let minutosIndex = this.minutos;
    let segundosIndex = this.segundos;
    let milisegundosIndex = this.milisegundos;
    if (this.horas < 10) {
      horasIndex = "0" + this.horas;
    }
    if (this.minutos < 10) {
      minutosIndex = "0" + this.minutos;
    }
    if (this.segundos < 10) {
      segundosIndex = "0" + this.segundos;
    }

    if (this.milisegundos < 10) {
      milisegundosIndex = "0" + this.milisegundos;
    }

    Index.innerHTML = `${horasIndex}:${minutosIndex}:${segundosIndex},${milisegundosIndex}`;
  }

  cronometro() {
    let cronometroInterval = setInterval(() => {
      if (bandera == false) {
        clearInterval(cronometroInterval);
      }
      if (
        this.horas == 0 &&
        this.minutos == 0 &&
        this.segundos == 0 &&
        this.milisegundos == 0
      ) {
        toggleDisplayIniciar();
        clearInterval(cronometroInterval);
      }
      if (this.milisegundos > 0) {
        this.milisegundos--;
      } else {
        if (this.segundos > 0) {
          this.segundos--;
          this.milisegundos = 99;
        } else {
          if (this.minutos > 0) {
            this.minutos--;
            this.segundos = 59;
            this.milisegundos = 99;
          } else {
            if (this.horas > 0) {
              this.horas--;
              this.minutos = 59;
              this.segundos = 59;
              this.milisegundos = 99;
            }
          }
        }
      }

      this.ajusteTiempo();
    }, 10);
  }
}
let $horas = document.querySelector("#horas");
let $minutos = document.querySelector("#minutos");
let $segundos = document.querySelector("#segundos");
let $milisegundos = document.querySelector("#milisegundos");
let mensaje = document.createElement("p");
let bandera = false;
let $iniciar = document.querySelector(".btn-success");
let $pausar = document.querySelector(".btn-danger");
let $resetear = document.querySelector(".btn-info");
let cronometro1 = new Cronometro();
$iniciar.addEventListener("click", () => {
  let variables = corroborarInput($horas, $minutos, $segundos, $milisegundos);
  console.log(cronometro1.horas != variables.horas);
  if (
    variables != false &&
    !(
      cronometro1.horas != variables.horas &&
      cronometro1.minutos != variables.minutos &&
      cronometro1.segundos != variables.segundos &&
      cronometro1.milisegundos != variables.milisegundos
    )
  ) {
    cronometro1.horas;
    cronometro1.minutos;
    cronometro1.segundos;
    cronometro1.milisegundos;
    bandera = true;
    toggleDisplayIniciar();
    cronometro1.cronometro();
  }
  if (
    variables != false &&
    cronometro1.horas != variables.horas &&
    cronometro1.minutos != variables.minutos &&
    cronometro1.segundos != variables.segundos &&
    cronometro1.milisegundos != variables.milisegundos
  ) {
    cronometro1.horas = variables.horas;
    cronometro1.minutos = variables.minutos;
    cronometro1.segundos = variables.segundos;
    cronometro1.milisegundos = variables.milisegundos;
    toggleDisplayIniciar();
    bandera = true;
    cronometro1.cronometro();
  }
});
$pausar.addEventListener("click", () => {
  if (bandera) {
    toggleDisplayIniciar();

    bandera = false;
  }
});

$resetear.addEventListener("click", () => {
  let variables = corroborarInput($horas, $minutos, $segundos, $milisegundos);
  if (bandera == true) {
    if (variables != false) {
      cronometro1.horas = variables.horas;
      cronometro1.minutos = variables.minutos;
      cronometro1.segundos = variables.segundos;
      cronometro1.milisegundos = variables.milisegundos;
      bandera = true;
      cronometro1.cronometro();
    }
  } else {
    cronometro1.horas = variables.horas;
    cronometro1.minutos = variables.minutos;
    cronometro1.segundos = variables.segundos;
    cronometro1.milisegundos = variables.milisegundos;
    cronometro1.cronometro();
  }
});
function corroborarInput(horas, minutos, segundos, milisegundos) {
  if (horas.value == "" || horas.value == null || horas.value == undefined) {
    horas.value = 0;
  }
  if (
    minutos.value == "" ||
    minutos.value == null ||
    minutos.value == undefined
  ) {
    minutos.value = 0;
  }
  if (
    segundos.value == "" ||
    segundos.value == null ||
    segundos.value == undefined
  ) {
    segundos.value = 0;
  }
  if (
    milisegundos.value == "" ||
    milisegundos.value == null ||
    milisegundos.value == undefined
  ) {
    milisegundos.value = 0;
  }
  if (
    horas.value < 0 ||
    minutos.value < 0 ||
    segundos.value < 0 ||
    milisegundos.value < 0
  ) {
    mensaje.innerHTML = `<b>ERROR: No puede haber tiempo negativo</b>`;
    document.querySelector("#contenedorBotones").prepend(mensaje);
    return false;
  }
  return {
    horas: horas.value,
    minutos: minutos.value,
    segundos: segundos.value,
    milisegundos: milisegundos.value,
  };
}

function toggleDisplayIniciar() {
  let elementoIniciar = document.getElementById("iniciar");
  if (elementoIniciar.style.display == "none") {
    elementoIniciar.style.display = "inline";
  } else {
    elementoIniciar.style.display = "none";
  }
}
