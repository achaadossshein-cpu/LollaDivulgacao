// pages/index.js
import { useEffect, useState } from "react";

export default function Home() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const SHEET_ID = "1towIpLR5wZUORrFy7vqq7mXKaK8Uff0EnRnaToC5zkk";
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const RANGE    = "Sheet1!A:B";

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`)
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
