const tg = window.Telegram.WebApp;

// Comunica a Telegram che l'app è pronta PRIMA di caricare le immagini
tg.ready();
tg.expand();

// Dati Utente veloci
const user = tg.initDataUnsafe.user;
if (user) {
    document.getElementById('u-name').innerText = user.first_name;
    if (user.photo_url) document.getElementById('u-photo').src = user.photo_url;
}

// Navigazione istantanea
function tab(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById('page-' + name).classList.add('active');
    document.getElementById('nav-' + name).classList.add('active');
    
    tg.HapticFeedback.impactOccurred('light');
}

// Generazione Shop
const shopData = [
    { name: "DAZN NOW", price: "10.00", img: "https://via.placeholder.com/300x400/222/D4AF37?text=DAZN" },
    { name: "SKY DAZN", price: "10.00", img: "https://via.placeholder.com/300x400/222/D4AF37?text=SKY" }
];

function build() {
    const container = document.getElementById('shop-container');
    shopData.forEach(item => {
        container.innerHTML += `
            <div class="product-card">
                <div class="product-banner">⭐ ${item.name}</div>
                <img src="${item.img}" class="product-img" loading="lazy">
                <div style="color:var(--gold); font-weight:bold; margin:10px auto;">€${item.price}</div>
                <button class="action-btn" style="width:90%; font-size:10px; padding:8px; margin: 5px auto 10px;" onclick="tg.showConfirm('Acquista?')">ACQUISTA</button>
            </div>`;
    });
}

function aggiungiFondi() {
    tg.sendData("deposito");
    tg.close();
}

build();
