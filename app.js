const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe.user;
document.getElementById('u-name').innerText = user ? user.first_name : "Giacomo";
if (user && user.photo_url) document.getElementById('u-photo').src = user.photo_url;

function tab(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    document.getElementById('nav-' + name).classList.add('active');
    tg.HapticFeedback.impactOccurred('light');
}

const shopData = [
    { 
        cat: "Sport", icon: "⚽", 
        items: [
            { id: "dazn", name: "DAZN NOW", img: "https://via.placeholder.com/300x400/222/D4AF37?text=DAZN", opts: [{m:"1 Mese", p:10.00}, {m:"3 Mesi", p:25.00}] },
            { id: "sky", name: "SKY DAZN", img: "https://via.placeholder.com/300x400/222/D4AF37?text=SKY", opts: [{m:"1 Mese", p:10.00}] }
        ]
    }
];

function build() {
    const container = document.getElementById('shop-container');
    shopData.forEach(category => {
        container.innerHTML += `<h3 class="category-title">| ${category.icon} ${category.cat.toUpperCase()}</h3>`;
        category.items.forEach(item => {
            const card = document.createElement('div');
            card.className = "product-card";
            card.innerHTML = `
                <div class="product-banner">${item.name}</div>
                <img src="${item.img}" class="product-img">
                <div class="price-tag" id="pr-${item.id}">€${item.opts[0].p.toFixed(2)}</div>
                <select class="month-select" onchange="upd('${item.id}', this, ${JSON.stringify(item.opts).replace(/"/g, '&quot;')})">
                    ${item.opts.map((o, i) => `<option value="${i}">${o.m}</option>`).join('')}
                </select>
                <button class="add-btn" onclick="tg.showConfirm('Acquista?')">AGGIUNGI</button>`;
            container.appendChild(card);
        });
    });
}

function upd(id, el, opts) {
    document.getElementById('pr-' + id).innerText = `€${opts[el.value].p.toFixed(2)}`;
    tg.HapticFeedback.impactOccurred('medium');
}

function aggiungiFondi() {
    tg.sendData("deposito");
    tg.close();
}

build();
