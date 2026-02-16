var currentResult;
var timesClickedCount;

const pad = (n) =>
  n < 10 && n >= 0 ? "0" + n : n > -10 && n < 0 ? "-0" + -n : n;

function inputToTime(m) {
  const [days, hours, minutes, seconds] = [
    "days",
    "hours",
    "minutes",
    "seconds",
  ].map((_) => parseFloat(document.getElementById(_).value || 0));

  const múltiploInput = document.getElementById("mult");

  const mult =
    ((_) => (Number.isNaN(_) ? 1 : _))(parseFloat(múltiploInput.value)) * m;
  const s = (seconds + (minutes + (hours + days * 24) * 60) * 60) * mult;
  return [days, hours, minutes, seconds, mult, s];
}

function addTimes(m) {
  const [days, hours, minutes, seconds, mult, s] = inputToTime(m);
  if (s == 0) return;
  currentResult += s;
  timesClickedCount++;
  if (displayTime() == 0) return;

  const nombreInput = document.getElementById("nombre");
  const númeroOperaciones = document.getElementById("timesClicked");
  const historyTable = document.getElementById("history");

  const row = historyTable.insertRow();
  const td1 = row.insertCell();
  const td2 = row.insertCell();

  if (m == -1) td1.style.color = "red";

  let entryText = `[${timesClickedCount.toString().padStart(3, "0")}] ${days}:${pad(
    hours,
  )}:${pad(minutes)}:${pad(seconds)}`;
  if (mult * m != 1) entryText += ` * ${mult * m}`;

  td1.textContent = entryText;

  const name = nombreInput.value;
  if (name === "") {
    td2.textContent = "";
  } else {
    td2.textContent = ` \u00A0---\u00A0"${name}"`;
    td2.style.color = "black";
  }

  númeroOperaciones.textContent = `Veces:\u00A0${timesClickedCount}`;
}

function divideTime() {
  if (timesClickedCount == 0) return;
  const [, , , , , s] = inputToTime(1);
  if (s == 0) return;

  const roundInput = document.getElementById("redondear");
  const cocienteBloque = document.getElementById("dividedResult");

  cocienteBloque.textContent = ((_) =>
    _ != Math.floor(_) ? _.toFixed(parseInt(roundInput.value)) : _)(
    currentResult / s,
  );
}

function displayTime() {
  if (timesClickedCount == 0) return 0;

  const bloqueResultado = document.getElementById("resultado");
  const roundInput = document.getElementById("redondear");

  const absResult = Math.abs(currentResult);
  var hoursResult = Math.floor(absResult / 3600);
  const minutesResult = Math.floor((absResult % 3600) / 60);
  var secondsResult = absResult % 60;
  if (secondsResult != Math.floor(secondsResult))
    secondsResult = secondsResult.toFixed(parseInt(roundInput.value));
  if (hoursResult >= 24) {
    const daysH = Math.floor(hoursResult / 24);
    hoursResult = hoursResult % 24;
    hoursResult = `${daysH}:${pad(hoursResult)}`;
  }
  if (currentResult < 0) hoursResult = `-${hoursResult}`;
  bloqueResultado.textContent = `${hoursResult}:${pad(minutesResult)}:${pad(secondsResult)}`;
}

function reset() {
  const númeroOperaciones = document.getElementById("timesClicked");
  const bloqueResultado = document.getElementById("resultado");
  const bloqueCociente = document.getElementById("dividedResult");
  const tablaHistorial = document.getElementById("history");

  timesClickedCount = 0;
  currentResult = 0;
  bloqueResultado.textContent = "Aquí aparecerá el resultado...";
  númeroOperaciones.textContent = "Veces:\u00A00";
  tablaHistorial.replaceChildren();
  bloqueCociente.replaceChildren();
}

function clean() {
  for (let campo of ["days", "hours", "minutes", "seconds", "mult", "nombre"]) {
    document.getElementById(campo).value = "";
  }
}
