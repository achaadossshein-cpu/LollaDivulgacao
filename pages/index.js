// pages/index.js
import { useEffect, useState } from "react";

export default function Home() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const sheetId = "1towIpLR5wZUORrFy7vqq7mXKaK8Uff0EnRnaToC5zkk";
const range  = "Sheet1!A:B";

`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      .then(res => res.json())
      .then(data => {
        const rows = data.values?.slice(1) || [];
        setLinks(rows);
      });
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Lolla.Divulgação</h1>
      {links.length === 0 && <p>Nenhum dado encontrado.</p>}
      <ul>
        {links.map(([nome, url], i) => (
          <li key={i}>
            <a href={url} target="_blank">{nome}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
