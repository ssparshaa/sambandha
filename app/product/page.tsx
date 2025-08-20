"use client"

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import NavBar from "../../client/components/NavBar";
import Footer from "client/components/Footer";

const CURRENCY_RATES = {
  NPR: 1,
  USD: 0.0072, 
  EUR: 0.0061,
  GBP: 0.0053,
  INR: 0.65,
  RUB: 0.60,
};

const CURRENCY_SYMBOLS = {
  NPR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  RUB: "₽",
};

const COLOR_OPTIONS = [
  { name: "Gold", gradient: "from-[#AE7B4B] via-[#B6895E] to-[#E9DDD2]", border: "border-transparent" },
  { name: "Silver", gradient: "from-[#CFCFCF] via-[#CFCFCF] to-[#949494]", border: "border-transparent" },
  { name: "Champagne", gradient: "from-[#BBA14F] via-[#BBA14F] to-[#E9E3D2]", border: "border-transparent" },
];

const MORE_PRODUCTS = [
  {
    name: "Snake Chain Necklace 50'",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/8bc813788c980f74b6475e17a8e83c0133563613?width=740",
    price: 5000,
    colors: [
      { bg: "bg-yellow-600", border: "border-[#151313]" },
      { bg: "bg-gray-300", border: "border-[#151313] border-opacity-20" },
    ],
    description: "18ct Gold Vermeil",
  },
];


type Currency = keyof typeof CURRENCY_RATES;

export default function ProductMorgan() {
  
  const [currency, setCurrency] = useState<Currency>("USD");
  const priceNPR = 5000;
  const convertedPrice = (priceNPR * CURRENCY_RATES[currency]).toFixed(2);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].name);

  const [moreProductColors, setMoreProductColors] = useState(
    MORE_PRODUCTS.map(() => COLOR_OPTIONS[0].name)
  );

  const handleMoreProductColorChange = (productIdx: number, colorName: string) => {
    setMoreProductColors((prev) => {
      const updated = [...prev];
      updated[productIdx] = colorName;
      return updated;
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Navigation */}
      <NavBar />

      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row px-4 md:px-10 items-start gap-6 lg:gap-[25px] w-full mt-8 lg:mt-[54px]">
        {/* Product Image */}
        <div className="w-full lg:flex-1">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/adc6f20b18e1d20bcabced31ecd328937174bcb7?width=1335" 
            alt="Morgan Eyeglasses"
            className="w-full h-auto"
          />
        </div>
        
        {/* Product Details and Description Container */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[25px] w-full lg:flex-[2]">
          {/* Product Details */}
          <div className="flex flex-col items-start gap-8 lg:gap-[42px] flex-1">
            <div className="flex flex-col items-start gap-6 lg:gap-[30px] w-full">
              <div className="flex flex-col items-start gap-6 lg:gap-[37px] w-full">
                <div className="flex flex-col items-start gap-6 lg:gap-[37px] w-full">
                  <div className="flex flex-col items-start gap-8 lg:gap-[50px] w-full">
                    <h1 className="text-[#1e1e1e] font-reckless text-2xl lg:text-[36px] font-normal leading-normal">
                      Morgan
                    </h1>
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex items-center gap-2">
                        <div className="text-[#686363] font-montreal text-lg lg:text-xl font-normal leading-normal">
                          {currency === "NPR"
                            ? `${CURRENCY_SYMBOLS[currency]} ${priceNPR}`
                            : `${CURRENCY_SYMBOLS[currency]} ${convertedPrice}`}
                        </div>
                        <div className="relative">
                          <select
                            value={currency}
                            onChange={e => setCurrency(e.target.value as Currency)}
                            className="border border-[#E8E8E8] rounded-full px-2 py-1 text-xs bg-white text-[#686363] font-montreal shadow focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-200 appearance-none cursor-pointer"
                            style={{
                              minWidth: 60,
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              appearance: "none",
                              backgroundColor: "white",
                              border: "1px solid #E8E8E8",
                              paddingRight: "1.5rem", // space for arrow
                            }}
                          >
                            <option value="NPR">NPR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="INR">INR</option>
                            <option value="RUB">RUB</option>
                          </select>
                          {/* Custom minimal down arrow icon */}
                          <span className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-[#686363]">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path d="M4 6l4 4 4-4" stroke="#686363" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="text-[#686363] font-montreal text-xs font-normal leading-normal">
                        incl. local Tax & Shipping.
                      </div>
                    </div>
                  </div>
                  <p className="text-[#686363] font-jost text-sm font-normal leading-[150%] w-full">
                    Sleek and timeless. Titanium glasses with an innovative bridge. A frame to suit every face, Morgan is a classic 'panto' shape.
                  </p>
                </div>
              </div>
              
              {/* Main Product Color Selection */}
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-start gap-2">
                  <span className="text-[#686363] font-montreal text-xs font-normal leading-normal">
                    Select Color
                  </span>
                  <span className="text-[#1e1e1e] font-montreal text-xs font-medium leading-normal">
                    {selectedColor}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-[26px] h-[26px] rounded-full bg-gradient-to-b ${color.gradient} border-2 transition-all duration-150 ${
                        selectedColor === color.name ? "border-[#1E1E1E] scale-110" : color.border
                      }`}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Add to Bag Button */}
            <button className="w-full max-w-[193px] h-[44px] rounded-[200px] bg-[#272727] flex items-center justify-center">
              <span className="text-[#f6f6f6] font-montreal text-sm font-normal leading-normal">
                Add to Bag
              </span>
            </button>
          </div>
          
          {/* Description Section */}
          <div className="flex flex-col items-start gap-6 lg:gap-8 flex-1">
            <div className="flex flex-col items-start gap-3 w-full">
              <div className="text-[#1e1e1e] font-montreal text-xs font-normal leading-normal">
                Description
              </div>
              <div className="w-full h-px bg-[#E8E8E8]"></div>
            </div>
            
            <div className="flex flex-col items-start gap-6 w-full">
              <p className="text-[#1e1e1e] font-jost text-sm font-normal leading-[150%] w-full">
                Sleek and timeless. Titanium glasses with an innovative bridge. A frame to suit every face, Morgan is a classic 'panto' shape. Named after James Morgan, the engineer who built the Regent's Canal, it features custom elements including fluid single piece bridge, adjustable nose pads and temple tips based on Constantin Brâncuși's Bird in Space.
              </p>
              
              <div className="text-[#1e1e1e] font-jost text-sm font-normal leading-[150%] w-full">
                <div>99.7% pure titanium front</div>
                <div>More than 4hv on the Vickers hardness test.</div>
                <div>Ion plated to over 0.3µ</div>
                <div>Weighs under 5.0g</div>
                <div>Adjustable titanium nose pads for a comfortable fit</div>
                <div>UV protection</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Products Section */}
      <div className="flex px-4 md:px-10 py-[30px] flex-col justify-center items-start gap-5 w-full bg-[#fae7e7] mt-16 mb-20">
        <h2 className="text-[#686363] font-montreal text-xl font-normal leading-normal">
          More Products
        </h2>
        {MORE_PRODUCTS.map((product, idx) => (
          <div key={product.name + idx} className="flex flex-col md:flex-row items-start gap-5 w-full">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full md:w-[370px] h-[250px] md:h-[330px] object-cover"
            />
            <div className="flex flex-col items-start gap-2.5 flex-1">
              <div className="flex flex-col items-start gap-[14px] w-full">
                <div className="flex items-center gap-2.5 w-full">
                  <h3 className="text-[#151313] font-reckless text-xl md:text-2xl font-normal leading-normal">
                    {product.name}
                  </h3>
                  <ArrowUpRight className="w-6 h-6 text-[#151313]" />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                  {/* Color Options for More Products */}
                  <div className="flex items-center gap-4">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => handleMoreProductColorChange(idx, color.name)}
                        className={`w-[26px] h-[26px] rounded-full bg-gradient-to-b ${color.gradient} border-2 transition-all duration-150 ${
                          moreProductColors[idx] === color.name ? "border-[#1E1E1E] scale-110" : color.border
                        }`}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                  <span className="text-[#151313] font-montreal text-sm font-normal leading-normal">
                    {product.description}
                  </span>
                </div>
                <div className="text-[#151313] font-montreal text-xl font-normal leading-normal">
                  Rs {product.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
     </div>
    );
  }
