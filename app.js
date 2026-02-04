const API_URL = "https://a4181-9711.b.jrnm.app/data";

const categoriesDiv = document.getElementById("categories");

fetch(API_URL)
  .then(response => response.json())
  .then(data => renderShop(data))
  .catch(err => {
    categoriesDiv.innerHTML = "<p>Errore caricamento dati</p>";
    console.error(err);
  });

function renderShop(data) {
  categoriesDiv.innerHTML = "";

  data.categories.forEach(cat => {
    const catDiv = document.createElement("div");
    catDiv.className = "category";

    const title = document.createElement("h2");
    title.textContent = cat.name;
    catDiv.appendChild(title);

    data.products
      .filter(p => p.category === cat.name)
      .forEach(prod => {
        const prodDiv = document.createElement("div");
        prodDiv.className = "product";

        let prices = "";
        for (const months in prod.prices) {
          prices += `<span>${months} mesi: €${prod.prices[months]}</span><br>`;
        }

        prodDiv.innerHTML = `
          <strong>${prod.name}</strong><br>
          ${prices}
        `;

        catDiv.appendChild(prodDiv);
      });

    categoriesDiv.appendChild(catDiv);
  });
}
