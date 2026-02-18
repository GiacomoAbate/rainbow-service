const tg = window.Telegram.WebApp;
tg.expand();

// DATI UTENTE
const user = tg.initDataUnsafe.user;
document.getElementById('u-name').innerText = user ? user.first_name : "Giacomo";
if (user && user.photo_url) document.getElementById('u-photo').src = user.photo_url;

// FUNZIONE CAMBIO PAGINA (Risolve il problema dei bottoni e sovrapposizioni)
function tab(name) {
    // 1. Nascondi TUTTE le sezioni
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(p => {
        p.classList.remove('active');
    });

    // 2. Rimuovi stato attivo da TUTTI i bottoni navbar
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach(n => {
        n.classList.remove('active');
    });

    // 3. Mostra solo la pagina cliccata e attiva il suo bottone
    document.getElementById('page-' + name).classList.add('active');
    document.getElementById('nav-' + name).classList.add('active');

    // 4. Torna in alto e feedback vibrazione
    window.scrollTo(0, 0);
    tg.HapticFeedback.impactOccurred('light');
}

// DATI PRODOTTI (Modifica questo array per cambiare titoli e prezzi)
const shopData = [
    {
        cat: "Sport", icon: "⚽",
        items: [
            { id: "dazn", name: "DAZN NOW", img: "https://via.placeholder.com/300x400/222/D4AF37?text=DAZN", opts: [{m:"1 Mese", p:10.00}, {m:"3 Mesi", p:25.00}] },
            { id: "sky", name: "SKY DAZN", img: "https://via.placeholder.com/300x400/222/D4AF37?text=SKY", opts: [{m:"1 Mese", p:10.00}] }
        ]
    },
    {
        cat: "Streaming", icon: "🎬",
        items: [
            { id: "netflix", name: "NETFLIX 4K", img: "https://via.placeholder.com/300x400/222/D4AF37?text=NETFLIX", opts: [{m:"1 Mese", p:8.00}, {m:"6 Mesi", p:40.00}] }
        ]
    }
];

// COSTRUZIONE SHOP
function initShop() {
    const container = document.getElementById('shop-container');
    container.innerHTML = ""; // Pulisce il contenitore

    shopData.forEach(category => {
        // Aggiunge il TITOLO della categoria sopra i prodotti
        const titleH3 = document.createElement('h3');
        titleH3.className = "category-title";
        titleH3.innerHTML = `| ${category.icon} ${category.cat.toUpperCase()}`;
        container.appendChild(titleH3);

        // Aggiunge ogni PRODOTTO della categoria
        category.items.forEach(item => {
            const card = document.createElement('div');
            card.className = "product-card";
            
            const optionsHtml = item.opts.map((o, i) => `<option value="${i}">${o.m}</option>`).join('');

            card.innerHTML = `
                <div class="product-banner">${item.name}</div>
                <img src="${item.img}" class="product-img">
                <div class="price-tag" id="price-${item.id}">€${item.opts[0].p.toFixed(2)}</div>
                <select class="month-select" onchange="updatePrice('${item.id}', this, ${JSON.stringify(item.opts).replace(/"/g, '&quot;')})">
                    ${optionsHtml}
                </select>
                <button class="add-btn" onclick="tg.showConfirm('Vuoi acquistare ${item.name}?')">AGGIUNGI AL CARRELLO</button>
            `;
            container.appendChild(card);
        });
    });
}

// AGGIORNAMENTO PREZZO DINAMICO
function updatePrice(id, selectElement, optionsArray) {
    const index = selectElement.value;
    const nuovoPrezzo = optionsArray[index].p;
    document.getElementById('price-' + id).innerText = `€${nuovoPrezzo.toFixed(2)}`;
    tg.HapticFeedback.impactOccurred('medium');
}

// FUNZIONE SALDO (CHIUDE E MANDA COMANDO AL BOT)
function aggiungiFondi() {
    tg.HapticFeedback.notificationOccurred('success');
    tg.sendData("deposito"); // Manda la parola "deposito" al bot
    tg.close(); // Chiude l'app
}

// AVVIO
initShop();
