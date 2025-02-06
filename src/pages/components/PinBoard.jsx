import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function PinBoard() {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCryptos, setSelectedCryptos] = useState([]);
  const [newCryptos, setNewCryptos] = useState([]);
  const [priceHistory, setPriceHistory] = useState({});

  useEffect(() => {
    const initialData = [
      { name: "BITCOIN", price: 12729, change: -2.64, updated: "5 seconds ago" },
      { name: "ETHEREUM", price: 3425, change: -1.34, updated: "10 seconds ago" },
      { name: "DOGECOIN", price: 0.24, change: -0.50, updated: "15 seconds ago" },
      { name: "RIPPLE", price: 1.05, change: -0.75, updated: "20 seconds ago" },
      { name: "LITECOIN", price: 150.25, change: -1.20, updated: "25 seconds ago" },
    ];
    setCryptoData(initialData);
    
    const initialHistory = {};
    initialData.forEach((crypto) => {
      initialHistory[crypto.name] = [
        { time: "1 min ago", price: crypto.price * 0.95 },
        { time: "30 sec ago", price: crypto.price * 0.98 },
        { time: "Now", price: crypto.price },
      ];
    });
    setPriceHistory(initialHistory);
  }, []);

  const addCryptos = () => {
    setSelectedCryptos([...new Set([...selectedCryptos, ...newCryptos])]);
    setNewCryptos([]);
  };

  const removeCrypto = (crypto) => {
    setSelectedCryptos(selectedCryptos.filter((item) => item !== crypto));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#0B091A] p-6">
      <h2 className="text-4xl font-bold text-center mb-4 text-[#E1DFEC] DMSans">
        PinBoard
      </h2>

      <div className="flex space-x-2 mb-4">
        <select
          multiple
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setNewCryptos([...e.target.selectedOptions].map(o => o.value))}
          value={newCryptos}
        >
          {cryptoData.map((crypto) => (
            <option key={crypto.name} value={crypto.name}>
              {crypto.name}
            </option>
          ))}
        </select>
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={addCryptos}
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {cryptoData
          .filter((crypto) => selectedCryptos.includes(crypto.name))
          .map((crypto, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-[#0B091A] hover:bg-[#7D67FF] border border-gray-600 transition-colors duration-300 text-white rounded-lg shadow-md w-full">
              <div className="flex flex-col space-y-2 w-1/2">
                <h3 className="text-lg font-bold">{crypto.name}</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white text-md font-bold rounded-full">
                    {crypto.name[0]}
                  </div>
                  <div className="text-lg font-semibold">${crypto.price}</div>
                </div>
                <div className="text-gray-400 text-sm">{crypto.updated}</div>
                <div className={`text-md font-bold ${crypto.change < 0 ? "text-red-500" : "text-green-500"}`}>
                  {crypto.change < 0 ? `↓ ${crypto.change}%` : `↑ ${crypto.change}%`}
                </div>
              </div>
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={priceHistory[crypto.name]}>
                    <XAxis dataKey="time" hide />
                    <YAxis domain={['auto', 'auto']} hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#E1DFEC" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => removeCrypto(crypto.name)}
              >
                <X size={16} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PinBoard;
