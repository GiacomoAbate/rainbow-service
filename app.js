const tg = window.Telegram.WebApp;
tg.expand();

// Caricamento Dati Utente reali da Telegram
document.getElementById('u-name').innerText = tg.initDataUnsafe.user.first_name || "Giacomo";
if(tg.initDataUnsafe.user.photo_url) {
    document.getElementById('u-photo').src = tg.initDataUnsafe.user.photo_url;
}

// Gestione Navigazione Pagine (Tab)
function tab(target) {
    // Rimuovi active da tutti i tasti
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    // Aggiungi active al tasto premuto (usiamo event.currentTarget)
    event.currentTarget.classList.add('active');

    // Nascondi tutte le pagine
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });

    // Mostra la pagina corretta
    const selectedPage = document.getElementById('view-' + target);
    if(selectedPage) {
        selectedPage.style.display = 'block';
        setTimeout(() => selectedPage.classList.add('active'), 10);
    }
}

// Funzione per aggiornare il saldo in tempo reale (chiamata dal bot)
window.addEventListener('message', function(event) {
    const data = event.data;
    if (data.type === 'update_balance') {
        document.getElementById('u-balance').innerText = data.value;
        document.getElementById('u-balance-large').innerText = data.value;
    }
});

        div.innerHTML=`
        <h3>${p.name}</h3>
        <small>${p.category}</small>
        ${prices}
        `;

        box.appendChild(div);
    });
}

function addToCart(id,name,label,price){
    cart.push({id,name,label,price});
    updateCartCount();
}

function updateCartCount(){
    document.getElementById("cartCount").innerText="🛒 "+cart.length;
}

document.getElementById("cartCount").onclick=()=>{
    renderCart();
    document.getElementById("cartModal").classList.remove("hidden");
};

function closeCart(){
    document.getElementById("cartModal").classList.add("hidden");
}

function renderCart(){
    const box=document.getElementById("cartItems");
    box.innerHTML="";
    let total=0;

    cart.forEach((c,i)=>{
        total+=c.price;
        box.innerHTML+=`
        ${c.name} ${c.label} - ${c.price}€
        <button onclick="removeItem(${i})">❌</button>
        <hr>`;
    });

    document.getElementById("total").innerText="Totale: "+total+"€";
}

function removeItem(i){
    cart.splice(i,1);
    renderCart();
    updateCartCount();
}

async function checkout(){
    await fetch(API+"/create_order",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({cart,coupon})
    });
    alert("Ordine inviato!");
    cart=[];
    updateCartCount();
    closeCart();
}

function applyCoupon(){
    coupon=document.getElementById("couponInput").value;
    alert("Coupon applicato");
}

loadData();







