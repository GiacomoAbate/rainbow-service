const tg = window.Telegram.WebApp;
tg.expand();

/* NAV */
function show(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* SUPPORTO */
function support() {
  tg.openTelegramLink("https://t.me/RainbowServiceBot");
}

/* UTENTE */
const user = tg.initDataUnsafe.user;
document.getElementById("user").innerHTML = `
  <div class="card">
    <b>Username:</b> ${user?.username || "—"}<br>
    <b>ID:</b> ${user?.id}<br>
    <b>Abbonamento:</b> da attivare
  </div>
`;

/* ACQUISTO */
function buy(plan) {
  tg.showPopup({
    title: "Abbonamento " + plan,
    message:
      "💳 PAYPAL\n" +
      "Invia il pagamento a:\n" +
      "contatta il supporto per il link\n\n" +

      "₿ CRYPTO\n" +
      "USDT (TRC20):\n" +
      "contatta il supporto per il token\n\n" +

      "🎁 AMAZON GIFT CARD\n" +
      "Invia il codice al supporto.\n\n" +

      "📩 Dopo il pagamento clicca SUPPORTO.",
    buttons: [
      { id: "support", type: "default", text: "Contatta supporto" },
      { type: "cancel", text: "Chiudi" }
    ]
  });
}

/* EVENTI */
tg.onEvent("popupButtonClicked", (id) => {
  if (id === "support") support();
});
