import axios from "axios";

export default async function handler(req, res) {
  try {
    const sheetId = process.env.SHEET_ID;
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    const range = "Página1!A:C"; // Nome | Imagem | Link

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const response = await axios.get(url);

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      return res.status(200).json([]);
    }

    const data = rows.slice(1).map(r => ({
      name: r[0],
      image: r[1],
      link: r[2]
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao acessar a planilha:", error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
}
