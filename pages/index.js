import { useEffect, useState } from 'react';

export default function Home() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const sheetId = process.env.NEXT_PUBLIC_SHEET_ID;     // coloque no .env
    const apiKey  = process.env.NEXT_PUBLIC_API_KEY;      // coloque no .env
    const range   = 'Sheet1!A:B';

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.values?.slice(1) || [];
        setLinks(rows);
      })
      .catch((err) => console.error('Erro ao buscar dados', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 flex flex-col items-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-pink-700 mb-4 text-center">
          Lolla.Divulgação
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Produtos da Shein com link de afiliada
        </p>

        {links.length === 0 ? (
          <p className="text-center text-gray-500">Carregando produtos...</p>
        ) : (
          <ul className="space-y-4">
            {links.map((row, i) => (
              <li key={i}>
                <a
                  href={row[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 transition duration-200"
                >
                  {row[0]}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
