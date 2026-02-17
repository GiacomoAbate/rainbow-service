const tg = window.Telegram.WebApp;
tg.expand();

// Dati Utente
const user = tg.initDataUnsafe.user;
document.getElementById('u-name').innerText = user ? user.first_name : "Giacomo";
if (user && user.photo_url) document.getElementById('u-photo').src = user.photo_url;

// Funzione Bottoni Navbar (Corretta)
function tab(name) {
    // Nascondi tutte le pagine
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    // Mostra quella selezionata
    document.getElementById('page-' + name).style.display = 'block';
    
    // Aggiorna icone navbar
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('nav-' + name).classList.add('active');
    
    window.scrollTo(0,0);
    tg.HapticFeedback.impactOccurred('light');
}

// Dati Shop (Titoli ordinati)
const shopData = [
    { 
        cat: "Sport", icon: "⚽", 
        items: [
            { id: "dazn", name: "DAZN NOW", img: "https://via.placeholder.com/300x400/222/D4AF37?text=DAZN", opts: [{m:"1 Mese", p:10.00}, {m:"3 Mesi", p:25.00}] },
            { id: "sky", name: "SKY DAZN", img: "https://via.placeholder.com/300x400/222/D4AF37?text=SKY", opts: [{m:"1 Mese", p:10.00}] }
        ]
    },
    {
        cat: "Emby", icon: "💻",
        items: [
            { id: "emby-b", name: "EMBY BASE", img: "https://via.placeholder.com/300x400/222/D4AF37?text=EMBY", opts: [{m:"1 Mese", p:5.00}] }
        ]
    }
];

function initShop() {
    const container = document.getElementById('shop-container');
    const nav = document.getElementById('cat-nav');
    
    shopData.forEach(category => {
        // Navigazione rapida
        const chip = document.createElement('div');
        chip.className = 'cat-chip';
        chip.innerHTML = `${category.icon} ${category.cat}`;
        chip.onclick = () => {
            document.getElementById('title-' + category.cat).scrollIntoView({behavior:'smooth'});
        };
        nav.appendChild(chip);

        // Titolo Categoria ordinato
        container.innerHTML += `<h3 class="category-title" id="title-${category.cat}">| ${category.icon} ${category.cat}</h3>`;
        
        // Prodotti della categoria
        category.items.forEach(item => {
            const optsJson = JSON.stringify(item.opts).replace(/"/g, '&quot;');
            container.innerHTML += `
                <div class="product-card">
                    <div class="product-banner">⭐ ${item.name}</div>
                    <img src="${item.img}" class="product-img">
                    <div class="price-tag" id="price-${item.id}">€${item.opts[0].p.toFixed(2)}</div>
                    <select class="month-select" onchange="updatePrice('${item.id}', this, ${optsJson})">
                        ${item.opts.map((o, i) => `<option value="${i}">${o.m}</option>`).join('')}
                    </select>
                    <button class="add-btn" onclick="tg.showConfirm('Aggiungere ${item.name}?')">AGGIUNGI AL CARRELLO</button>
                </div>`;
        });
    });
}

function updatePrice(id, select, opts) {
    document.getElementById('price-' + id).innerText = `€${opts[select.value].p.toFixed(2)}`;
    tg.HapticFeedback.impactOccurred('light');
}

function aggiungiFondi() {
    tg.sendData("deposito_richiesto");
    tg.close();
}

initShop();
