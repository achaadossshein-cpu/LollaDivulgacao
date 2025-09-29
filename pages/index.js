import { useEffect, useState } from "react";

export default function Home() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const sheetId = "1towIpLR5wZUORrFy7vqq7mXKaK8Uff0EnRnaToC5zkk"; // substitua pelo ID da sua planilha
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // configure no Vercel
    const range  = "Sheet1!A:B";

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const rows = data.values?.slice(1) || [];
        setLinks(rows);
      })
      .catch(err => console.error("Erro ao buscar dados da planilha:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lolla.Divulgação</h1>
      <p>Produtos da Shein com link de afiliada</p>
      <ul>
        {links.map((row, index) => (
          <li key={index}>
            <a href={row[1]} target="_blank" rel="noopener noreferrer">{row[0]}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
