const tg = window.Telegram.WebApp;
tg.expand();

// Nome Utente Dinamico
const user = tg.initDataUnsafe.user;
document.getElementById('u-name').innerText = user ? user.first_name : "Giacomo";
if (user && user.photo_url) document.getElementById('u-photo').src = user.photo_url;

// Navigazione tra le 5 pagine
function tab(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    document.getElementById('nav-' + name).classList.add('active');
    window.scrollTo(0, 0);
    tg.HapticFeedback.impactOccurred('light');
}

// Dati Shop (Modifica qui per aggiungere categorie)
const shopData = [
    { name: "Emby", icon: "💻", prods: [{n: "EMBY BASE", p: "€10"}, {n: "EMBY PREMIUM", p: "€20"}] },
    { name: "Jellyfin", icon: "📺", prods: [{n: "JELLY SERVER", p: "€15"}] },
    { name: "Plex", icon: "🎬", prods: [{n: "PLEX PASS", p: "€12"}] }
];

function init() {
    const nav = document.getElementById('cat-nav');
    const container = document.getElementById('shop-container');

    shopData.forEach(cat => {
        // Chip per lo scroll rapido
        const chip = document.createElement('div');
        chip.className = 'cat-chip';
        chip.innerHTML = `${cat.icon} ${cat.name}`;
        chip.onclick = () => {
            document.getElementById('sec-' + cat.name).scrollIntoView({ behavior: 'smooth' });
            tg.HapticFeedback.impactOccurred('medium');
        };
        nav.appendChild(chip);

        // Sezione prodotti
        const section = document.createElement('div');
        section.id = 'sec-' + cat.name;
        section.className = 'category-section';
        let items = cat.prods.map(p => `
            <div class="product-card-v" onclick="tg.showConfirm('Acquista ${p.n}?')">
                <img src="https://via.placeholder.com/100/111/D4AF37?text=${cat.icon}">
                <div class="product-info">
                    <div class="product-name">${p.n}</div>
                    <div style="font-size:12px; color:#888;">Streaming Alta Qualità</div>
                </div>
                <div style="font-weight:bold;">${p.p}</div>
            </div>`).join('');
        
        section.innerHTML = `<h3 class="category-title">| ${cat.icon} ${cat.name.toUpperCase()}</h3>${items}`;
        container.appendChild(section);
    });
}
init();
