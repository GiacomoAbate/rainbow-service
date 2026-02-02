const API_URL = "https://a4181-9711.b.jrnm.app/data";
const shop = document.getElementById("shop");

fetch(API_URL)
  .then(r => r.json())
  .then(data => {
    shop.innerHTML = "";

    data.categories.forEach(cat => {
      const c = document.createElement("div");
      c.className = "category";
      c.innerHTML = `<h2>${cat.name}</h2>`;

      data.products
        .filter(p => p.category === cat.name)
        .forEach(p => {
          const box = document.createElement("div");
          box.className = "product";

          box.innerHTML = `
            <b>${p.name}</b><br>
            1 mese: €${p.prices["1"]}<br>
            3 mesi: €${p.prices["3"]}<br>
            6 mesi: €${p.prices["6"]}<br><br>
            <button onclick="buy('${p.name}')">Acquista</button>
          `;

          c.appendChild(box);
        });

      shop.appendChild(c);
    });
  });

function buy(name) {
  window.location.href = "https://t.me/RainbowServiceBot?start=" + name;
}
