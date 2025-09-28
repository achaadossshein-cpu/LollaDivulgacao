import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const sheetId = process.env.SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const range = "Página1!A:C"; // Colunas: Nome | Imagem | Link
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
        const res = await axios.get(url);
        const rows = res.data.values;
        if (rows && rows.length > 1) {
          const data = rows.slice(1).map(r => ({
            name: r[0],
            image: r[1],
            link: r[2]
          }));
          setProducts(data);
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Lolla.Divulgação</h1>
      <p>Produtos da Shein com link de afiliada</p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {products.map((p, i) => (
          <div key={i} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            textAlign: "center"
          }}>
            {p.image && (
              <img src={p.image} alt={p.name} style={{ maxWidth: "100%", borderRadius: "6px" }} />
            )}
            <h3>{p.name}</h3>
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer"
                 style={{
                   display: "inline-block",
                   padding: "8px 12px",
                   backgroundColor: "#ff5a5f",
                   color: "white",
                   borderRadius: "6px",
                   textDecoration: "none"
                 }}>
                Comprar
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
          }
