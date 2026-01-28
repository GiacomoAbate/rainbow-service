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
  tg.showPopup({
    title: "Acquisto " + plan,
    message:
      "Per acquistare l'abbonamento:\n\n" +
      "💳 PayPal\n" +
      "₿ Crypto\n" +
      "🎁 Amazon Gift Card\n\n" +
      "Dopo il pagamento, contatta il supporto.",
    buttons: [
      { id: "support", type: "default", text: "Contatta supporto" },
      { type: "cancel", text: "Chiudi" }
    ]
  });
}

tg.onEvent("popupClosed", () => {});
tg.onEvent("popupButtonClicked", (id) => {
  if (id === "support") {
    tg.openTelegramLink("https://t.me/RainbowServiceBot");
  }
});
