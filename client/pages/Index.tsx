import NavBar from "../../client/components/NavBar";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
    <NavBar />
      {/* Main Content Wrapper */}
      <div className="flex flex-col w-full max-w-[1200px] mx-auto px-4 md:px-12 lg:px-0">

        {/* Header */}
        <div className="flex flex-col justify-center items-center gap-[10px] w-full py-[60px] lg:py-[100px]">
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
                Probably the Closest Thing to Time Travel — Powered by Touch, Fueled by Love.
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
        <div className="flex justify-center items-center gap-[10px] w-full py-[60px] border-t-2 border-b-2 border-black/20">
          <div className="flex flex-wrap justify-center items-center gap-6 w-full text-center">
            <div className="flex-1 text-black text-center font-epilogue text-[24px] md:text-[32px] font-bold">
              स्नेह
            </div>
            <div className="flex-1 text-black text-center font-epilogue text-[24px] md:text-[32px] font-bold">
              حب
            </div>
            <div className="flex-1 text-black text-center font-epilogue text-[24px] md:text-[32px] font-bold">
              Amour
            </div>
            <div className="flex-1 text-black text-center font-epilogue text-[24px] md:text-[32px] font-bold">
              사랑
            </div>
            <div className="flex-1 text-black text-center font-epilogue text-[24px] md:text-[32px] font-bold">
              愛
            </div>
            <div className="flex-1 text-black text-center font-epilogue text-[24px] md:text-[32px] font-bold">
              אהבה
            </div>
          </div>
        </div>

        {/* Memories Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-[30px] md:gap-[60px] w-full py-[60px]">
          <div className="flex flex-col h-[432px] p-[20px] justify-center items-center gap-[10px] flex-1 bg-cover bg-center bg-no-repeat shadow-2xl transform rotate-3 md:rotate-[7deg] bg-[url('https://api.builder.io/api/v1/image/assets/TEMP/10bd7ddb2e9ac2f6a88a4be37b28f999842ae3a3?width=747')]">
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

      </div> {/* End Main Content Wrapper */}
    </div>
  );
}
