const API_URL = "https://a4181-9711.b.jrnm.app/data";
const shop = document.getElementById("shop");

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    shop.innerHTML = "";

    data.categories.forEach(cat => {
      const catDiv = document.createElement("div");
      catDiv.className = "category";

      const title = document.createElement("h2");
      title.innerText = cat.name;
      catDiv.appendChild(title);

      data.products
        .filter(p => p.category === cat.name)
        .forEach(p => {
          const prod = document.createElement("div");
          prod.className = "product";

          prod.innerHTML = `
            <span>${p.name}</span>
            <span class="price">€ ${p.price}</span>
          `;

          catDiv.appendChild(prod);
        });

      shop.appendChild(catDiv);
    });
  })
  .catch(err => {
    shop.innerHTML = "❌ Errore nel caricamento dei prodotti";
    console.error(err);
  });
