const tg = window.Telegram.WebApp;
tg.expand();

// 1. NOME UTENTE REALE
const user = tg.initDataUnsafe.user;
document.getElementById('u-name').innerText = user ? user.first_name : "Giacomo";
if (user && user.photo_url) document.getElementById('u-photo').src = user.photo_url;

// 2. CAMBIO TAB PRINCIPALE
function tab(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    document.getElementById('nav-' + name).classList.add('active');
    window.scrollTo(0, 0);
    tg.HapticFeedback.impactOccurred('light');
}

// 3. DATI SHOP (Modifica questo array per cambiare categorie e prodotti)
const shopData = [
    { 
        name: "Emby", 
        icon: "💻", 
        prods: [
            {n: "EMBY BASE", p: "€10"},
            {n: "EMBY PREMIUM", p: "€20"}
        ] 
    },
    { 
        name: "Jellyfin", 
        icon: "📺", 
        prods: [
            {n: "JELLY SERVER", p: "€15"}
        ] 
    },
    { 
        name: "Plex", 
        icon: "🎬", 
        prods: [
            {n: "PLEX PASS", p: "€12"}
        ] 
    }
];

// 4. COSTRUZIONE SHOP DINAMICO (In colonna con scroll)
function initShop() {
    const nav = document.getElementById('cat-nav');
    const container = document.getElementById('shop-container');

    shopData.forEach(cat => {
        // Bottone rapido in alto
        const chip = document.createElement('div');
        chip.className = 'cat-chip';
        chip.innerHTML = `${cat.icon} ${cat.name}`;
        chip.onclick = () => {
            document.getElementById('sec-' + cat.name).scrollIntoView({ behavior: 'smooth' });
            tg.HapticFeedback.impactOccurred('medium');
        };
        nav.appendChild(chip);

        // Sezione Categoria
        const section = document.createElement('div');
        section.id = 'sec-' + cat.name;
        section.className = 'category-section';
        
        let prodsHtml = cat.prods.map(prod => `
            <div class="product-card-vertical" onclick="tg.showConfirm('Acquista ${prod.n}?')">
                <img src="https://via.placeholder.com/100/111/D4AF37?text=${cat.name}">
                <div class="product-info">
                    <div class="product-name">${prod.n}</div>
                    <div style="font-size:11px; color:#666;">Streaming 4K - 24/7</div>
                </div>
                <div class="product-price">${prod.p}</div>
            </div>
        `).join('');

        section.innerHTML = `
            <h3 class="category-title">| ${cat.icon} ${cat.name.toUpperCase()}</h3>
            <div class="product-list">${prodsHtml}</div>
        `;
        container.appendChild(section);
    });
}

initShop();
