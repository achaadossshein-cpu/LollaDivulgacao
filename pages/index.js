import { useEffect, useState } from "react";

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregar() {
      const sheetId = "1towIpLR5wZUORrFy7vqq7mXKaK8Uff0EnRnaToC5zkk";
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      const range = "Links!A:B"; // aba "Links", colunas A e B

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.values) {
        // pula a primeira linha (cabeçalho)
        setProdutos(data.values.slice(1));
      }
    }
    carregar();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Lolla.Divulgação</h1>
      <p>Produtos da Shein com link de afiliada</p>

      <ul>
        {produtos.map((row, idx) => (
          <li key={idx}>
            <a href={row[1]} target="_blank" rel="noopener noreferrer">
              {row[0]}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
