// Inizializza l'app di Telegram
const tg = window.Telegram.WebApp;
tg.expand();

// IMPOSTA NOME UTENTE DINAMICO
// Se aperto in Telegram usa il nome reale, altrimenti usa "Ospite"
const user = tg.initDataUnsafe.user;
if (user) {
    document.getElementById('u-name').innerText = user.first_name;
    if (user.photo_url) {
        document.getElementById('u-photo').src = user.photo_url;
    }
} else {
    document.getElementById('u-name').innerText = "Giacomo"; // Default per test browser
}

// FUNZIONE PER CAMBIARE PAGINA
function tab(name) {
    console.log("Cambiando sezione a: " + name); // Utile per debug

    // 1. Nascondi tutte le sezioni
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    // 2. Togli il colore oro da tutti i pulsanti
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(n => n.classList.remove('active'));

    // 3. Mostra la sezione cliccata
    const selectedPage = document.getElementById('page-' + name);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // 4. Colora il pulsante cliccato
    // Cerchiamo il pulsante tramite ID o tramite la funzione stessa
    const selectedBtn = document.getElementById('btn-' + name);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
}
