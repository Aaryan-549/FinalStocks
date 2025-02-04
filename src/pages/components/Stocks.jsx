import React, { useState, useEffect } from "react";

const staticCryptoData = [
  { name: "BITCOIN", price: "$12,729", change: "-2.64", updated: "5 seconds ago" },
  { name: "ETHEREUM", price: "$3,425", change: "-1.34", updated: "10 seconds ago" },
  { name: "DOGECOIN", price: "$0.24", change: "-0.50", updated: "15 seconds ago" },
  { name: "RIPPLE", price: "$1.05", change: "-0.75", updated: "20 seconds ago" },
  { name: "LITECOIN", price: "$150.25", change: "-1.20", updated: "25 seconds ago" },
  { name: "CARDANO", price: "$2.15", change: "-1.45", updated: "30 seconds ago" },
  { name: "POLKADOT", price: "$18.75", change: "-0.85", updated: "35 seconds ago" },
  { name: "CHAINLINK", price: "$25.30", change: "-1.10", updated: "40 seconds ago" },
  { name: "STELLAR", price: "$0.32", change: "-0.65", updated: "45 seconds ago" },
  { name: "MONERO", price: "$230.80", change: "-1.85", updated: "50 seconds ago" },
  { name: "BITCOIN CASH", price: "$540.00", change: "-2.00", updated: "55 seconds ago" },
  { name: "EOS", price: "$4.25", change: "-1.15", updated: "60 seconds ago" },
  { name: "DASH", price: "$180.40", change: "-2.10", updated: "65 seconds ago" },
  { name: "ZCASH", price: "$130.75", change: "-1.75", updated: "70 seconds ago" },
  { name: "VECHAIN", price: "$0.11", change: "-0.45", updated: "75 seconds ago" },
  { name: "TETHER", price: "$1.00", change: "0.00", updated: "80 seconds ago" },
  { name: "SOLANA", price: "$95.50", change: "-1.95", updated: "85 seconds ago" },
  { name: "TRON", price: "$0.09", change: "-0.40", updated: "90 seconds ago" },
  { name: "IOTA", price: "$1.45", change: "-0.60", updated: "95 seconds ago" },
  { name: "NEO", price: "$38.75", change: "-1.80", updated: "100 seconds ago" },
  { name: "TEZOS", price: "$3.95", change: "-0.85", updated: "105 seconds ago" },
  { name: "AVALANCHE", price: "$72.30", change: "-2.20", updated: "110 seconds ago" },
  { name: "ALGORAND", price: "$1.20", change: "-0.55", updated: "115 seconds ago" },
  { name: "FANTOM", price: "$2.30", change: "-1.25", updated: "120 seconds ago" },
  { name: "HEDERA", price: "$0.45", change: "-0.30", updated: "125 seconds ago" },
  { name: "COSMOS", price: "$28.50", change: "-2.10", updated: "130 seconds ago" },
  { name: "HARMONY", price: "$0.32", change: "-0.50", updated: "135 seconds ago" },
  { name: "GALA", price: "$0.08", change: "-0.20", updated: "140 seconds ago" },
  { name: "FLOW", price: "$9.60", change: "-1.90", updated: "145 seconds ago" }
];

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    setCryptoData(staticCryptoData);
  }, []);

  return (
    <div className="mx-[16.8125rem] w-[53.3rem] DMSans flex justify-center items-center min-h-screen p-0" style={{ backgroundColor: "rgb(16,14,33)" }}>
      <table className="w-full max-w-6xl bg-gray-800 text-white p-0 rounded-lg shadow-lg h-full text-center border-separate border-spacing-4" style={{ backgroundColor: "rgb(16,14,33)" }}>
        <thead>
          <tr className="border-b border-gray-700 text-gray-400 text-lg">
            <th className="p-4 DMSans">Stocks</th>
            <th className="p-4 DMSans">Updated</th>
            <th className="p-4 DMSans">Change</th>
            <th className="p-4 DMSans">Price</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto, index) => (
            <tr key={index} className="border-b border-gray-700 text-lg">
              <td className="p-4 flex items-center justify-center">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mr-2">B</span>
                {crypto.name}
              </td>
              <td className="p-4 text-gray-400">{crypto.updated}</td>
              <td className={`p-4 ${crypto.change < 0 ? "text-red-500" : "text-green-500"}`}>
                ↓ {crypto.change}%
              </td>
              <td className="p-4">{crypto.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
