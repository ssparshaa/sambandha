// app/page.tsx (App Router)
import NavBar from "../components/NavBar";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full max-w-[1440px] mx-auto flex flex-col items-start bg-white">
      <NavBar />

      {/* Header */}
      <div className="flex flex-col justify-center items-center gap-[10px] w-full px-4 md:px-12 lg:px-[100px] py-[60px] lg:py-[100px] bg-white">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-[28px] w-full">
          <div className="flex flex-col justify-center items-center lg:items-start gap-[40px] flex-1">
            <div className="flex flex-col items-center lg:items-start gap-[40px] w-full">
              <div className="w-full text-[#2d2d2d] font-epilogue text-[16px] md:text-[20px] font-bold leading-[24px] md:leading-[30px] text-center lg:text-left">
                Your Memories, Close to Your Heart
              </div>
              <div className="w-full text-[#2d2d2d] font-epilogue text-[40px] md:text-[60px] lg:text-[80px] font-bold leading-[50px] md:leading-[70px] lg:leading-[90px] text-center lg:text-left">
                Stories You Can Hold
              </div>
            </div>
            <div className="w-full text-[#2d2d2d] font-epilogue text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px] text-center lg:text-left">
              Probably the Closest Thing to Time Travel — Powered by Touch,
              Fueled by Love.
            </div>
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/38ec7941626fec7cff55aa25e3ad5aba509d0ad0?width=1212"
            alt="Stories You Can Hold"
            className="h-[250px] md:h-[350px] lg:h-[424px] flex-1 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Logos Section */}
      <div className="flex justify-center items-center gap-[10px] w-full px-4 md:px-12 lg:px-[66px] bg-white">
        <div className="flex h-[147px] py-[60px] items-start flex-1 border-t-2 border-b-2 border-black/20 gap-0">
          <div className="flex justify-between items-center flex-1">
            <div className="flex-1 text-black text-center font-epilogue text-[20px] md:text-[24px] lg:text-[32px] font-bold leading-[27px]">
              स्नेह
            </div>
            <div className="flex-1 text-black text-center font-epilogue text-[20px] md:text-[24px] lg:text-[32px] font-bold leading-[27px]">
              حب
            </div>
          </div>
          <div className="flex justify-between items-center flex-1">
            <div className="flex-1 text-black text-center font-epilogue text-[20px] md:text-[24px] lg:text-[32px] font-bold leading-[27px]">
              Amour
            </div>
            <div className="flex-1 text-black text-center font-epilogue text-[20px] md:text-[24px] lg:text-[32px] font-bold leading-[27px]">
              사랑
            </div>
          </div>
          <div className="flex justify-between items-center flex-1">
            <div className="flex-1 text-black text-center font-epilogue text-[20px] md:text-[24px] lg:text-[32px] font-bold leading-[27px]">
              愛
            </div>
            <div className="flex-1 text-black text-center font-epilogue text-[20px] md:text-[24px] lg:text-[32px] font-bold leading-[27px]">
              אהבה
            </div>
          </div>
        </div>
      </div>

      {/* Memories */}
      <div className="flex justify-center items-center gap-[30px] md:gap-[60px] w-full px-4 md:px-12 lg:px-[100px] py-[60px] bg-white">
        <div className="flex flex-col md:flex-row h-auto md:h-[432px] p-[20px] justify-center items-center gap-[10px] flex-1 bg-cover bg-center bg-no-repeat shadow-2xl transform rotate-3 md:rotate-[7deg] bg-[url('https://api.builder.io/api/v1/image/assets/TEMP/10bd7ddb2e9ac2f6a88a4be37b28f999842ae3a3?width=747')]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/5cc000595fda30aae93acb29ea6024aa40a4e7d8?width=667"
            alt="Memory"
            className="flex-1 w-full h-full object-cover shadow-inner"
          />
        </div>
        <div className="hidden md:flex flex-col h-[432px] p-[20px] justify-center items-center gap-[10px] flex-1 bg-cover bg-center bg-no-repeat shadow-2xl transform -rotate-[7deg] bg-[url('https://api.builder.io/api/v1/image/assets/TEMP/ac84463a2daa2d2085a9bc0edf2ef4d1ae61c87b?width=747')]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/3b05af66c6e0de826a6dbb92d2e1094805da444f?width=667"
            alt="Memory"
            className="flex-1 w-full h-full object-cover shadow-inner"
          />
        </div>
        <div className="hidden lg:flex flex-col h-[432px] p-[20px] justify-center items-center gap-[10px] flex-1 bg-cover bg-center bg-no-repeat shadow-2xl transform rotate-[7deg] bg-[url('https://api.builder.io/api/v1/image/assets/TEMP/09b05a73488f39840df84313971bbc7195ccb876?width=747')]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/f42889beed5632ae8484b70892bf32e3495aadcf?width=667"
            alt="Memory"
            className="flex-1 w-full h-full object-cover shadow-inner"
          />
        </div>
      </div>

      {/* Products */}
      <div className="flex flex-col items-center gap-[60px] w-full px-4 md:px-12 lg:px-[100px] py-[60px] bg-white">
        <div className="w-full text-[#2d2d2d] text-center font-epilogue text-[24px] md:text-[32px] font-bold leading-[32px] md:leading-[42px]">
          Products
        </div>
        <div className="flex flex-col justify-center items-center gap-[60px] w-full">
          <div className="flex flex-col md:flex-row justify-center items-center gap-[30px] md:gap-[67.5px] w-full">
            <div className="flex flex-col items-start gap-[25px] flex-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/2614228aa5ebab10f87604f8b79a6372eec0d012?width=737"
                alt="Snake Chain Necklace"
                className="h-[250px] md:h-[315px] w-full object-cover rounded-lg"
              />
              <div className="flex flex-col justify-center items-start gap-[10px] w-full">
                <div className="w-full text-[#2d2d2d] font-epilogue text-[18px] md:text-[20px] font-bold leading-[26px] md:leading-[30px]">
                  Snake Chain Necklace 50cm/20'
                </div>
                <div className="w-full text-[#2d2d2d] font-epilogue text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px]">
                  Rs 5000
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[25px] flex-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/a3a074d206007be20a8e545864017ff5e260c3a5?width=737"
                alt="Alta Capture Charm Bracelet"
                className="h-[250px] md:h-[315px] w-full object-cover rounded-lg"
              />
              <div className="flex flex-col justify-center items-start gap-[10px] w-full">
                <div className="w-full text-[#2d2d2d] font-epilogue text-[18px] md:text-[20px] font-bold leading-[26px] md:leading-[30px]">
                  Alta Capture Charm Bracelet
                </div>
                <div className="w-full text-[#2d2d2d] font-epilogue text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px]">
                  Rs 5000
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[25px] flex-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/0d6b5c0bf9cfdc9a32ba72a3f0ba23a3a58d1f48?width=737"
                alt="You Really Got Me"
                className="h-[250px] md:h-[315px] w-full object-cover rounded-lg"
              />
              <div className="flex flex-col justify-center items-start gap-[10px] w-full">
                <div className="w-full text-[#2d2d2d] font-epilogue text-[18px] md:text-[20px] font-bold leading-[26px] md:leading-[30px]">
                  You Really Got Me
                </div>
                <div className="w-full text-[#2d2d2d] font-epilogue text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px]">
                  The Kinks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="flex flex-col justify-center items-center gap-[60px] w-full px-4 md:px-12 lg:px-[100px] py-[80px] md:py-[130px] bg-white">
        <div className="w-full text-[#2d2d2d] text-center font-epilogue text-[24px] md:text-[32px] font-bold leading-[32px] md:leading-[42px]">
          How it works
        </div>
        <div className="flex justify-center items-center gap-[60px] w-full">
          <div className="flex flex-col md:flex-row justify-center items-center gap-[40px] md:gap-[125px] flex-1">
            <div className="flex flex-col justify-center items-center gap-[56px] flex-1">
              <div className="flex flex-col justify-center items-center gap-[56px] w-full">
                <div className="w-[100px] md:w-[130px] h-[100px] md:h-[130px] bg-[#e5e5e5] rounded-lg"></div>
                <div className="flex flex-col justify-center items-center gap-[19px] w-full">
                  <div className="w-full text-[#2d2d2d] text-center font-epilogue text-[20px] md:text-[27px] font-bold leading-[32px] md:leading-[42px]">
                    Create & Curate
                  </div>
                  <div className="w-full text-[#2d2d2d] text-center font-epilogue text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px]">
                    Login to upload photos, notes, voice clips, and dates — all
                    in one place.
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col justify-center items-center gap-[56px] flex-1">
              <div className="flex flex-col justify-center items-center gap-[56px] w-full">
                <div className="w-[130px] h-[130px] bg-[#e5e5e5] rounded-lg"></div>
                <div className="flex flex-col justify-center items-center gap-[19px] w-full">
                  <div className="w-full text-[#2d2d2d] text-center font-epilogue text-[27px] font-bold leading-[42px]">
                    Create & Curate
                  </div>
                  <div className="w-full text-[#2d2d2d] text-center font-epilogue text-[17px] font-normal leading-[27px]">
                    Login to upload photos, notes, voice clips, and dates — all
                    in one place.
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col justify-center items-center gap-[56px] flex-1">
              <div className="flex flex-col justify-center items-center gap-[56px] w-full">
                <div className="w-[130px] h-[130px] bg-[#e5e5e5] rounded-lg"></div>
                <div className="flex flex-col justify-center items-center gap-[19px] w-full">
                  <div className="w-full text-[#2d2d2d] text-center font-epilogue text-[27px] font-bold leading-[42px]">
                    Create & Curate
                  </div>
                  <div className="w-full text-[#2d2d2d] text-center font-epilogue text-[17px] font-normal leading-[27px]">
                    Login to upload photos, notes, voice clips, and dates — all
                    in one place.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col justify-center items-center gap-[10px] w-full px-4 md:px-12 lg:px-[100px] pb-[70px] bg-white">
        <div className="flex pt-[70px] justify-center items-center gap-0 w-full border-t-2 border-black/20">
          <div className="flex flex-col md:flex-row justify-center items-start gap-[40px] md:gap-[190px] flex-1">
            <div className="flex flex-col justify-center items-start gap-[60px] flex-1 h-full">
              <div className="flex flex-col items-start gap-[40px] w-full">
                <div className="flex justify-center items-center gap-[5px]">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/873d074b568ad3dc0e100f871fed99d7a0518729?width=54"
                    alt="Sambandha logo"
                    className="w-[27px] h-[27px]"
                  />
                  <div className="text-[#2d2d2d] font-epilogue text-[20px] font-bold leading-[30px]">
                    Sambandha
                  </div>
                </div>
                <div className="w-full text-[#2d2d2d] font-epilogue text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px]">
                  This is a template Figma file, turned into code using Anima.
                  Learn more at AnimaApp.com This is a template Figma file,
                  turned into code using Anima. Learn more at AnimaApp.com
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* social icons ... (left as-is) */}
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-[20px] flex-1 h-full">
              <div className="w-full text-[#151313] font-epilogue text-[20px] font-bold leading-[22px] uppercase">
                SHOP
              </div>
              <div className="flex flex-col items-start gap-[25px] w-full">
                <div className="w-full text-[#656665] font-epilogue text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  New arrival
                </div>
                <div className="w-full text-[#656665] font-epilogue text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  Shop by category
                </div>
                <div className="w-full text-[#656665] font-epilogue text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  Shop by collection
                </div>
                <div className="w-full text-[#656665] font-epilogue text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  Gift
                </div>
              </div>
              <div className="w-full text-black/30 font-poppins text-[15px] font-normal leading-[22px] uppercase">
                © 2025 — Copyright
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
