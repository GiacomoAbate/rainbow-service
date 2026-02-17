const tg = window.Telegram.WebApp;
tg.expand();

// FIX NOME: Prende il nome reale da Telegram
const firstName = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.first_name : "Utente";
document.getElementById('u-name').innerText = firstName;

// FIX FOTO: Prende la foto reale
if(tg.initDataUnsafe.user && tg.initDataUnsafe.user.photo_url) {
    document.getElementById('u-photo').src = tg.initDataUnsafe.user.photo_url;
}

// FUNZIONE CAMBIO PAGINA (TAB)
function tab(target) {
    // 1. Cambia colore ai pulsanti della barra
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    // L'elemento cliccato diventa attivo
    event.currentTarget.classList.add('active');

    // 2. Nascondi tutte le sezioni
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    // 3. Mostra solo quella cliccata
    const targetPage = document.getElementById('view-' + target);
    if (targetPage) {
        targetPage.style.display = 'block';
    }
}
