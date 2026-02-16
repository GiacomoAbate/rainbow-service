const API = https://shop-premi-c20.d.jrnm.app;

let allProducts = [];
let cart = [];
let coupon = null;

async function loadData(){
    const res = await fetch(API + "/data");
    const data = await res.json();
    allProducts = data;
    renderCategories();
    renderProducts(allProducts);
}

function renderCategories(){
    const box = document.getElementById("categories");
    box.innerHTML = "";

    let cats = ["Tutti", ...new Set(allProducts.map(p=>p.category))];

    cats.forEach(cat=>{
        const el = document.createElement("div");
        el.className="cat";
        el.innerText=cat;
        el.onclick=()=>{
            if(cat==="Tutti") renderProducts(allProducts);
            else renderProducts(allProducts.filter(p=>p.category===cat));
        };
        box.appendChild(el);
    });
}

function renderProducts(list){
    const box=document.getElementById("products");
    box.innerHTML="";

    list.forEach(p=>{
        const div=document.createElement("div");
        div.className="product";

        let prices="";
        p.prices.forEach((pr,i)=>{
            prices+=`<button onclick="addToCart('${p.id}', '${p.name}', '${pr.label}', ${pr.price})">
            ${pr.label} - ${pr.price}€
            </button>`;
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




