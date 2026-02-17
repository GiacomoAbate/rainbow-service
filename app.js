const tg = window.Telegram.WebApp;
tg.expand();

// Imposta dati utente
const user = tg.initDataUnsafe.user;
document.getElementById('u-name').innerText = user ? user.first_name : "Giacomo";
if (user && user.photo_url) document.getElementById('u-photo').src = user.photo_url;

// 1. CHIUDI APP E APRI PAGAMENTO SUL BOT
function aggiungiFondi() {
    tg.HapticFeedback.impactOccurred('medium');
    // Questo chiude la mini app e manda un messaggio al bot
    tg.sendData("action_deposito"); 
    tg.close(); 
}

// 2. MOSTRA CRONOLOGIA (Simulata)
function mostraCronologia() {
    document.getElementById('modal-cronologia').style.display = 'flex';
    tg.HapticFeedback.impactOccurred('light');
}

function chiudiCronologia() {
    document.getElementById('modal-cronologia').style.display = 'none';
}

// Navigazione Tab
function tab(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    document.getElementById('nav-' + name).classList.add('active');
    tg.HapticFeedback.impactOccurred('light');
}

// Inizializzazione shop (come prima)...
