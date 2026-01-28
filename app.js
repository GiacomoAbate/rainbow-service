const tg = window.Telegram.WebApp;
tg.expand();

function show(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

const user = tg.initDataUnsafe.user;

document.getElementById("user").innerHTML = `
  <div class="card">
    <b>Username:</b> ${user?.username || "—"}<br>
    <b>ID:</b> ${user?.id}<br>
    <b>Abbonamento:</b> non attivo
  </div>
`;

function buy(plan) {
  tg.showAlert("Hai scelto: " + plan + "\\n(Pagamenti in arrivo)");
}
