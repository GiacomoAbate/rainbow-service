const tg = window.Telegram.WebApp;
tg.expand();

// 1. IMPOSTA NOME UTENTE DINAMICO
const user = tg.initDataUnsafe.user;
document.getElementById('u-name').innerText = user ? user.first_name : "Giacomo";
if (user && user.photo_url) document.getElementById('u-photo').src = user.photo_url;

// 2. CAMBIO PAGINA (TAB)
function tab(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    document.getElementById('nav-' + name).classList.add('active');
    tg.HapticFeedback.impactOccurred('light');
}

// 3. LOGICA CATEGORIE (Simulazione dati che riceverai dal bot)
const myData = [
    { name: "Emby", icon: "💻", prods: [{n: "EMBY BASE", img: "b.jpg"}, {n: "EMBY PREMIUM", img: "p.jpg"}] },
    { name: "Jellyfin", icon: "📺", prods: [{n: "JELLY SERVER", img: "j.jpg"}] },
    { name: "Plex", icon: "🎬", prods: [{n: "PLEX PASS", img: "pl.jpg"}] }
];

function loadCategories() {
    const list = document.getElementById('cat-list');
    myData.forEach((cat, i) => {
        const div = document.createElement('div');
        div.className = `cat-item ${i===0?'active':''}`;
        div.innerHTML = `${cat.icon} ${cat.name}`;
        div.onclick = () => {
            document.querySelectorAll('.cat-item').forEach(item => item.classList.remove('active'));
            div.classList.add('active');
            renderProducts(cat);
        };
        list.appendChild(div);
    });
    renderProducts(myData[0]);
}

function renderProducts(cat) {
    document.getElementById('cat-selected-title').innerText = `| ${cat.icon} ${cat.name.toUpperCase()}`;
    const grid = document.getElementById('prod-list');
    grid.innerHTML = '';
    cat.prods.forEach(p => {
        grid.innerHTML += `
            <div class="product-card" onclick="tg.showConfirm('Vuoi acquistare ${p.n}?')">
                <div class="prod-tag">${p.n}</div>
                <img src="https://via.placeholder.com/150x200/111/D4AF37?text=Product" style="width:100%">
            </div>
        `;
    });
}

loadCategories();
