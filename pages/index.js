// index.js
// === CONFIGURAÇÃO ===
const SHEET_ID = "1towIpLR5wZUORrFy7vqq7mXKaK8Uff0EnRnaToC5zkk";
const API_KEY = "AIzaSyD0BmGBsG8F1SuRpVY53EpVJLm6g9NNWyw";
const RANGE = "Sheet1!A:B"; // Colunas Nome e URL

// === FUNÇÃO PARA BUSCAR DADOS ===
async function loadLinks() {
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    if (!data.values || data.values.length < 2) {
      document.getElementById("links").innerHTML = "<p>Nenhum dado encontrado.</p>";
      return;
    }

    // Remove cabeçalho
    const [header, ...rows] = data.values;

    // Monta lista de produtos
    const html = rows
      .map(row => {
        const nome = row[0] || "Produto sem nome";
        const url = row[1] || "#";
        return `<li><a href="${url}" target="_blank">${nome}</a></li>`;
      })
      .join("");

    document.getElementById("links").innerHTML = `<ul>${html}</ul>`;
  } catch (err) {
    console.error(err);
    document.getElementById("links").innerHTML = "<p>Erro ao carregar links.</p>";
  }
}

// === INICIAR ===
document.addEventListener("DOMContentLoaded", loadLinks);
