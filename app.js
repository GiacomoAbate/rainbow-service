const tg = window.Telegram.WebApp;
tg.expand();

function show(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function support() {
  tg.openTelegramLink("https://t.me/RainbowServiceBot");
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
  tg.showPopup({
    title: "Abbonamento " + plan,
    message:
      "💳 PAYPAL\n" +
      "Invia il pagamento a:\n" +
      "contatta il supporto\n\n" +

      "₿ CRYPTO\n" +
      "USDT (TRC20):\n" +
      "contatta il supporto\n\n" +

      "🎁 AMAZON GIFT CARD\n" +
      "Invia il codice al supporto.\n\n" +

      "Dopo il pagamento, contattaci.",
    buttons: [
      { id: "support", type: "default", text: "Contatta supporto" },
      { type: "cancel", text: "Chiudi" }
    ]
  });
}

tg.onEvent("popupButtonClicked", (id) => {
  if (id === "support") {
    support();
  }
});

