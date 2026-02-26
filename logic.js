var tiempoActual;
var cuentaOperaciones;

const pad = (n) =>
  n < 10 && n >= 0 ? "0" + n : n > -10 && n < 0 ? "-0" + -n : n;

function inputToTime() {
  let datos = new FormData(document.getElementById("form-tiempos"));

  const nombre = datos.get("nombre");
  datos.delete("nombre");
  const factor = parseFloat(datos.get("factor") || 1);
  datos.delete("factor");

  const [días, horas, minutos, segundos] = Array.from(datos.values()).map((c) =>
    parseFloat(c || 0),
  );

  const entradaTotalSegundos =
    (((días * 24 + horas) * 60 + minutos) * 60 + segundos) * factor;

  return [entradaTotalSegundos, días, horas, minutos, segundos, factor, nombre];
}

function registrarHistorial(días, horas, minutos, segundos, factor, nombre, m) {
  if (días + horas + minutos + segundos == 0) return;

  const fila = document.getElementById("historial").insertRow();
  const td_vez = fila.insertCell();
  const td_tiempo = fila.insertCell();
  const td_nombre = fila.insertCell();

  td_vez.textContent = `[${(++cuentaOperaciones).toString().padStart(3, "0")}]`;

  td_tiempo.textContent = ` ${días}:${pad(horas)}:${pad(minutos)}:${pad(segundos)}${factor == 1 ? "" : ` * ${factor}`}`;
  if (m == -1) td_tiempo.style.color = "red";

  td_nombre.textContent = nombre === "" ? "" : ` \u00A0---\u00A0"${nombre}"`;
  td_nombre.style.color = "black";

  document.getElementById("cuentaClics").textContent =
    `Veces:\u00A0${cuentaOperaciones}`;
}

function addTimes(m) {
  const [entradaTotalSegundos, ...datos] = inputToTime();

  registrarHistorial(...datos, m);

  if (entradaTotalSegundos == 0) return;

  tiempoActual += entradaTotalSegundos * m;

  displayTime();
}

function divideTime() {
  if (cuentaOperaciones == 0) return;
  const total_s = inputToTime()[0];
  if (total_s == 0) return;

  const decimalesEntrada = document.getElementById("redondear");
  const cocienteBloque = document.getElementById("cociente");

  cocienteBloque.textContent = ((_) =>
    _ != Math.floor(_) ? _.toFixed(parseInt(decimalesEntrada.value)) : _)(
    tiempoActual / total_s,
  );
}

function displayTime() {
  if (cuentaOperaciones == 0) return;

  const bloqueResultado = document.getElementById("resultado");
  const decimalesEntrada = document.getElementById("redondear");

  const totalAbsoluto = Math.abs(tiempoActual);

  var totalHoras = Math.floor(totalAbsoluto / 3600);
  const totalMinutos = Math.floor((totalAbsoluto % 3600) / 60);
  var totalSegundos = totalAbsoluto % 60;

  if (totalSegundos != Math.floor(totalSegundos))
    totalSegundos = totalSegundos.toFixed(parseInt(decimalesEntrada.value));

  if (totalHoras >= 24) {
    const totalDías = Math.floor(totalHoras / 24);
    totalHoras = totalHoras % 24;
    totalHoras = `${totalDías}:${pad(totalHoras)}`;
  }

  if (tiempoActual < 0) totalHoras = `-${totalHoras}`;

  bloqueResultado.textContent = `${totalHoras}:${pad(totalMinutos)}:${pad(totalSegundos)}`;
}

function reset() {
  cuentaOperaciones = 0;
  tiempoActual = 0;
  document.getElementById("resultado").textContent =
    "Aquí aparecerá el resultado...";
  document.getElementById("cuentaClics").textContent = "Veces:\u00A00";
  document.getElementById("historial").replaceChildren();
  document.getElementById("cociente").replaceChildren();
}

function clean() {
  document.querySelectorAll("input").forEach(function (campo) {
    campo.value = "";
  });
}
