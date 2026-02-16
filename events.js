reset();

document
  .getElementById("sumar-btn")
  .addEventListener("click", () => addTimes(1));
document
  .getElementById("restar-btn")
  .addEventListener("click", () => addTimes(-1));
document.getElementById("clean-btn").addEventListener("click", clean);

document.getElementById("reset-btn").addEventListener("click", reset);
document.getElementById("divide-btn").addEventListener("click", divideTime);

document.getElementById("round-btn").addEventListener("click", displayTime);
