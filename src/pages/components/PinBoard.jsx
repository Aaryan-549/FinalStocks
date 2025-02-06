import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function PinBoard() {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCryptos, setSelectedCryptos] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedCryptos")) || [];
  });
  const [newCryptos, setNewCryptos] = useState([]);
  const [priceHistory, setPriceHistory] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const initialData = [
        { name: "BITCOIN", price: 12729, change: -2.64, updated: "5 seconds ago" },
        { name: "ETHEREUM", price: 3425, change: -1.34, updated: "10 seconds ago" },
        { name: "DOGECOIN", price: 0.24, change: -0.50, updated: "15 seconds ago" },
        { name: "RIPPLE", price: 1.05, change: -0.75, updated: "20 seconds ago" },
        { name: "LITECOIN", price: 150.25, change: -1.20, updated: "25 seconds ago" },
        { name: "CARDANO", price: 2.15, change: -1.45, updated: "30 seconds ago" },
        { name: "POLKADOT", price: 18.75, change: -0.85, updated: "35 seconds ago" },
        { name: "CHAINLINK", price: 25.30, change: -1.10, updated: "40 seconds ago" },
        { name: "STELLAR", price: 0.32, change: -0.65, updated: "45 seconds ago" },
        { name: "MONERO", price: 230.80, change: -1.85, updated: "50 seconds ago" },
        { name: "BITCOIN CASH", price: 540.00, change: -2.00, updated: "55 seconds ago" },
        { name: "EOS", price: 4.25, change: -1.15, updated: "60 seconds ago" },
        { name: "DASH", price: 180.40, change: -2.10, updated: "65 seconds ago" },
        { name: "ZCASH", price: 130.75, change: -1.75, updated: "70 seconds ago" },
        { name: "VECHAIN", price: 0.11, change: -0.45, updated: "75 seconds ago" },
        { name: "TETHER", price: 1.00, change: 0.00, updated: "80 seconds ago" },
        { name: "SOLANA", price: 95.50, change: -1.95, updated: "85 seconds ago" },
        { name: "TRON", price: 0.09, change: -0.40, updated: "90 seconds ago" },
        { name: "IOTA", price: 1.45, change: -0.60, updated: "95 seconds ago" },
        { name: "NEO", price: 38.75, change: -1.80, updated: "100 seconds ago" },
        { name: "TEZOS", price: 3.95, change: -0.85, updated: "105 seconds ago" },
        { name: "AVALANCHE", price: 72.30, change: -2.20, updated: "110 seconds ago" },
        { name: "ALGORAND", price: 1.20, change: -0.55, updated: "115 seconds ago" },
        { name: "FANTOM", price: 2.30, change: -1.25, updated: "120 seconds ago" },
        { name: "HEDERA", price: 0.45, change: -0.30, updated: "125 seconds ago" },
        { name: "COSMOS", price: 28.50, change: -2.10, updated: "130 seconds ago" },
        { name: "HARMONY", price: 0.32, change: -0.50, updated: "135 seconds ago" },
        { name: "GALA", price: 0.08, change: -0.20, updated: "140 seconds ago" },
        { name: "FLOW", price: 9.60, change: -1.90, updated: "145 seconds ago" }
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

  useEffect(() => {
    localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));
  }, [selectedCryptos]);

  const addCryptos = () => {
    setSelectedCryptos([...new Set([...selectedCryptos, ...newCryptos])]);
    setNewCryptos([]);
    setDropdownOpen(false);
  };

  const removeCrypto = (crypto) => {
    setSelectedCryptos(selectedCryptos.filter((item) => item !== crypto));
  };

  return (
    <div className="flex flex-col items-center min-h-[30%] bg-[#0B091A] p-6">
      <h2 className="text-4xl font-bold text-center mb-4 text-[#E1DFEC] DMSans">
        PinBoard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {cryptoData
          .filter((crypto) => selectedCryptos.includes(crypto.name))
          .map((crypto, index) => (
            <div key={index} className="relative flex items-center space-x-4 p-4 bg-[#0B091A] hover:bg-[#7D67FF] border border-gray-600 transition-colors duration-300 text-white rounded-lg shadow-md w-full group">
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
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => removeCrypto(crypto.name)}
              >
                <X size={16} />
              </button>
            </div>
          ))}

        {/* "Add More" Button with Dropdown */}
        <div className="relative">
          <button
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-400 text-gray-400 hover:text-white hover:border-white transition cursor-pointer rounded-lg w-full"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            + Add More <ChevronDown className="ml-2" size={18} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-14 left-0 w-60 bg-gray-900 text-white rounded-lg shadow-lg p-4 z-10 transition-opacity duration-200">
              <h3 className="text-lg font-semibold mb-2">Select Cryptos</h3>
              <div className="max-h-40 overflow-y-auto">
                {cryptoData.map((crypto) => (
                  <label
                    key={crypto.name}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={crypto.name}
                      onChange={(e) =>
                        setNewCryptos((prev) =>
                          e.target.checked
                            ? [...prev, e.target.value]
                            : prev.filter((c) => c !== e.target.value)
                        )
                      }
                      checked={newCryptos.includes(crypto.name)}
                      className="accent-blue-500"
                    />
                    <span className="text-md">{crypto.name}</span>
                  </label>
                ))}
              </div>
              <button
                className="w-full mt-3 p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                onClick={addCryptos}
              >
                Add Selected
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PinBoard;
