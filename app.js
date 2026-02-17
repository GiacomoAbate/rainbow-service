const tg = window.Telegram.WebApp;
tg.expand();

// 1. IMPOSTA NOME UTENTE REALE
const user = tg.initDataUnsafe.user;
document.getElementById('u-name').innerText = user ? user.first_name : "Giacomo";
if (user && user.photo_url) document.getElementById('u-photo').src = user.photo_url;

// 2. FUNZIONE CAMBIO TAB
function tab(name) {
    // Gestione Pagine
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');

    // Gestione Bottoni Navbar
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('nav-' + name).classList.add('active');
    
    tg.HapticFeedback.impactOccurred('light');
}

// 3. LOGICA CATEGORIE DINAMICHE (Dati che verranno dal tuo bot)
const databaseBot = [
    { nome: "Emby", icona: "💻", prods: [{t: "EMBY BASE"}, {t: "EMBY PREMIUM"}] },
    { nome: "Jellyfin", icona: "📺", prods: [{t: "JELLY SERVER"}] },
    { nome: "Plex", icona: "🎬", prods: [{t: "PLEX PASS"}] }
];

function inizializzaShop() {
    const container = document.getElementById('cat-list');
    databaseBot.forEach((cat, index) => {
        const chip = document.createElement('div');
        chip.className = `cat-chip ${index === 0 ? 'active' : ''}`;
        chip.innerHTML = `${cat.icona} ${cat.nome}`;
        chip.onclick = () => {
            document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            caricaProdotti(cat);
        };
        container.appendChild(chip);
    });
    caricaProdotti(databaseBot[0]);
}

function caricaProdotti(categoria) {
    document.getElementById('cat-selected-title').innerText = `| ${categoria.icona} ${categoria.nome.toUpperCase()}`;
    const grid = document.getElementById('prod-list');
    grid.innerHTML = '';
    categoria.prods.forEach(p => {
        grid.innerHTML += `
            <div class="product-card" onclick="tg.showConfirm('Vuoi acquistare ${p.t}?')">
                <div class="prod-tag">${p.t}</div>
                <img src="https://via.placeholder.com/200x250/111/D4AF37?text=Rainbow+Service" style="width:100%; display:block;">
            </div>
        `;
    });
}

inizializzaShop();
