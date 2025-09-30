// pages/api/post-to-buffer.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const sheetId = "1towIpLR5wZUORrFy7vqq7mXKaK8Uff0EnRnaToC5zkk"; // ID da sua planilha
    const apiKey = process.env.GOOGLE_API_KEY; // chave no Vercel
    const bufferToken = process.env.BUFFER_ACCESS_TOKEN; // token do Buffer
    const profileId = process.env.BUFFER_PROFILE_ID; // ID do perfil no Buffer

    // 1️⃣ Buscar links da planilha
    const range = "Sheet1!A:B";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.values || data.values.length < 2) {
      return res.status(400).json({ error: "Nenhum link encontrado na planilha" });
    }

    // Pega o último link da lista
    const lastRow = data.values[data.values.length - 1];
    const title = lastRow[0];
    const link = lastRow[1];

    // 2️⃣ Montar o post para o Buffer
    const bufferResponse = await fetch(
      `https://api.bufferapp.com/1/updates/create.json?access_token=${bufferToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile_ids: [profileId],
          text: `${title} ✨\n${link}`,
          shorten: true,
        }),
      }
    );

    const bufferData = await bufferResponse.json();

    if (bufferData.error) {
      return res.status(400).json({ error: bufferData.error });
    }

    return res.status(200).json({ message: "Post enviado com sucesso!", bufferData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
