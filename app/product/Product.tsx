// This would be for Next.js App Router: app/product-morgan/page.tsx
// Or Next.js Pages Router: pages/product-morgan.tsx

import { ShoppingBag, Plus, Menu, ArrowUpRight, Instagram, Facebook, Twitter, Youtube, Twitch } from "lucide-react";

export default function ProductMorgan() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex justify-center items-center gap-2.5 w-full px-4 md:px-10 py-3 bg-[rgba(227,240,234,0.30)] backdrop-blur-[9px]">
        {/* Logo */}
        <div className="flex flex-col items-start gap-2.5 flex-1">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/08df01d3190fb575f1895d32eef17f9bb191dc8b?width=270" 
            alt="Sambandha"
            className="w-[100px] md:w-[135px] h-[25px] md:h-[34px]"
          />
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex justify-center items-center gap-[54px] flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[#151313] font-reckless text-base font-normal leading-normal">
              Home
            </span>
            <Plus className="w-2.5 h-2.5 text-[#656665]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#151313] font-reckless text-base font-normal leading-normal">
              Products
            </span>
            <Plus className="w-2.5 h-2.5 text-[#656665]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#151313] font-reckless text-base font-normal leading-normal">
              About Us
            </span>
            <Plus className="w-2.5 h-2.5 text-[#656665]" />
          </div>
        </div>
        
        {/* Navigation Actions */}
        <div className="flex justify-end items-center gap-5 flex-1">
          <ShoppingBag className="w-5 h-5 text-[#151313]" />
          <Menu className="w-[23px] h-[22px] text-[#151313]" />
        </div>
      </nav>

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
                      <div className="text-[#686363] font-montreal text-lg lg:text-xl font-normal leading-normal">
                        Rs 5000
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
              
              {/* Color Selection */}
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-start gap-2">
                  <span className="text-[#686363] font-montreal text-xs font-normal leading-normal">
                    Select Color
                  </span>
                  <span className="text-[#1e1e1e] font-montreal text-xs font-medium leading-normal">
                    Gold
                  </span>
                </div>
                
                {/* Color Options */}
                <div className="flex items-center gap-4">
                  <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-b from-[#AE7B4B] via-[#B6895E] to-[#E9DDD2] border-2 border-transparent"></div>
                  <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-b from-[#CFCFCF] via-[#CFCFCF] to-[#949494] border-2 border-transparent"></div>
                  <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-b from-[#BBA14F] via-[#BBA14F] to-[#E9E3D2] border-2 border-[#1E1E1E]"></div>
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
      <div className="flex px-4 md:px-10 py-[30px] flex-col justify-center items-start gap-5 w-full bg-[#fae7e7] mt-16">
        <h2 className="text-[#686363] font-montreal text-xl font-normal leading-normal">
          More Products
        </h2>
        
        <div className="flex flex-col md:flex-row items-start gap-5 w-full">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/8bc813788c980f74b6475e17a8e83c0133563613?width=740" 
            alt="Snake Chain Necklace"
            className="w-full md:w-[370px] h-[250px] md:h-[330px] object-cover"
          />
          
          <div className="flex flex-col items-start gap-2.5 flex-1">
            <div className="flex flex-col items-start gap-[14px] w-full">
              <div className="flex items-center gap-2.5 w-full">
                <h3 className="text-[#151313] font-reckless text-xl md:text-2xl font-normal leading-normal">
                  Snake Chain Necklace 50'
                </h3>
                <ArrowUpRight className="w-6 h-6 text-[#151313]" />
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-[38px] h-[38px] rounded-full border border-[#151313] bg-yellow-600"></div>
                  <div className="w-[34px] h-[34px] rounded-full border border-[#151313] border-opacity-20 bg-gray-300"></div>
                </div>
                <span className="text-[#151313] font-montreal text-sm font-normal leading-normal">
                  18ct Gold Vermeil
                </span>
              </div>
              
              <div className="text-[#151313] font-montreal text-xl font-normal leading-normal">
                Rs 5000
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col lg:flex-row px-4 md:px-10 py-12 lg:py-[100px] justify-center items-center gap-8 lg:gap-[50px] w-full">
        <div className="flex flex-col justify-center items-center gap-2.5 w-full lg:flex-1">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/a881ded5b60a10e80e0598cc5507203c8174a571?width=532" 
            alt="Sambandha"
            className="w-[200px] lg:w-[266px] h-[50px] lg:h-[67px]"
          />
          
          <div className="flex flex-col items-center gap-5">
            <div className="text-[#656665] font-reckless text-lg lg:text-xl italic font-normal leading-[22px] font-variant-caps">
              FOLLOW US ON
            </div>
            
            <div className="flex items-start gap-4 lg:gap-5">
              <div className="relative">
                <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-full border border-[#151313] border-opacity-40 backdrop-blur-[3px]"></div>
                <Instagram className="w-5 lg:w-6 h-5 lg:h-6 text-[#151313] absolute top-2.5 lg:top-3 left-2.5 lg:left-3" />
              </div>
              <div className="relative">
                <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-full border border-[#151313] border-opacity-40 backdrop-blur-[3px]"></div>
                <Facebook className="w-5 lg:w-6 h-5 lg:h-6 text-[#151313] absolute top-2.5 lg:top-3 left-2.5 lg:left-3" />
              </div>
              <div className="relative">
                <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-full border border-[#151313] border-opacity-40 backdrop-blur-[3px]"></div>
                <Twitter className="w-5 lg:w-6 h-5 lg:h-6 text-[#151313] absolute top-2.5 lg:top-3 left-2.5 lg:left-3" />
              </div>
              <div className="relative">
                <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-full border border-[#151313] border-opacity-40 backdrop-blur-[3px]"></div>
                <Youtube className="w-5 lg:w-6 h-5 lg:h-6 text-[#151313] absolute top-2.5 lg:top-3 left-2.5 lg:left-3" />
              </div>
              <div className="relative">
                <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-full border border-[#151313] border-opacity-40 backdrop-blur-[3px]"></div>
                <Twitch className="w-5 lg:w-6 h-5 lg:h-6 text-[#151313] absolute top-2.5 lg:top-3 left-2.5 lg:left-3" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-between items-center w-full lg:flex-1">
          <div className="flex flex-col items-center lg:items-start gap-5">
            <div className="text-[#151313] font-reckless text-lg lg:text-xl font-normal leading-[22px] font-variant-caps">
              SHOP
            </div>
            
            <div className="flex flex-col items-center lg:items-start gap-2.5">
              <div className="text-[#656665] font-poppins text-sm font-normal leading-normal tracking-[-0.28px]">
                New arrival
              </div>
              <div className="text-[#656665] font-poppins text-sm font-normal leading-normal tracking-[-0.28px]">
                Shop by category
              </div>
              <div className="text-[#656665] font-poppins text-sm font-normal leading-normal tracking-[-0.28px]">
                Shop by collection
              </div>
              <div className="text-[#656665] font-poppins text-sm font-normal leading-normal tracking-[-0.28px]">
                Gift
              </div>
            </div>
            
            <div className="text-black text-opacity-30 font-montreal text-[15px] font-medium leading-[22px] font-variant-caps">
              © 2025 — Copyright
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
