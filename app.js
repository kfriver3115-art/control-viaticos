let saldoInicial = localStorage.getItem("saldoInicial") || 0;
let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

function guardarSaldo() {
  saldoInicial = document.getElementById("saldoInicial").value;
  localStorage.setItem("saldoInicial", saldoInicial);
  calcular();
}

function agregarMovimiento() {
  const tipo = document.getElementById("tipo").value;
  const monto = parseFloat(document.getElementById("monto").value);
  const descripcion = document.getElementById("descripcion").value;

  if (!monto) return alert("Ingresa monto");

  movimientos.push({
    tipo,
    monto,
    descripcion,
    fecha: new Date().toLocaleDateString()
  });

  localStorage.setItem("movimientos", JSON.stringify(movimientos));

  calcular();
  render();
}

function calcular() {
  let saldo = parseFloat(saldoInicial);
  let pendiente = 0;

  movimientos.forEach(m => {
    if (m.tipo === "personal") saldo -= m.monto;
    if (m.tipo === "empresa") {
      saldo -= m.monto;
      pendiente += m.monto;
    }
    if (m.tipo === "reembolso") {
      saldo += m.monto;
      pendiente -= m.monto;
    }
  });

  document.getElementById("saldo").innerText = "S/ " + saldo.toFixed(2);
  document.getElementById("pendiente").innerText = "S/ " + pendiente.toFixed(2);
}

function render() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  movimientos.forEach(m => {
    const li = document.createElement("li");
    li.innerText = `${m.fecha} - ${m.tipo} - S/ ${m.monto} - ${m.descripcion}`;
    lista.appendChild(li);
  });
}

calcular();
render();