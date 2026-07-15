"use client";
import Image from "next/image";
import NavBar from "../../client/components/NavBar";
import Footer from "../../client/components/Footer";

export default function About() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Navigation */}
      <NavBar />
      
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center gap-[10px] w-full px-4 md:px-12 lg:px-[100px] pt-[60px] lg:pt-[80px] bg-white">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-[40px] lg:gap-[60px] w-full">
          {/* Hero Image */}
          <div className="flex flex-col items-center flex-1 w-full">
            <Image
              src="https://api.builder.io/api/v1/image/assets/TEMP/cbabca9cf727b25bf1b48e1af27aa43972db37cb?width=1344"
              alt="Sambandha NFC jewelry collection"
              width={672}
              height={400}
              className="w-full h-auto object-cover rounded-[12px] shadow-lg"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center items-start gap-[32px] flex-1 py-4 lg:py-0">
            {/* Main Heading */}
            <div className="w-full">
              <h1 className="text-[#2d2d2d] text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[36px] md:leading-[44px] lg:leading-[52px]">
                Sambandha
              </h1>
              <p className="text-[#666] text-[16px] md:text-[18px] font-normal leading-[24px] md:leading-[28px] mt-2">
                Where Memories Live Forever
              </p>
            </div>

            {/* Company Description */}
            <div className="w-full">
              <p className="text-[#2d2d2d] text-[17px] md:text-[18px] font-normal leading-[26px] md:leading-[28px]">
                We are a passionate team based in Kathmandu, dedicated to redefining how memories are preserved and cherished. At Sambandha, we believe that the moments that shape our lives should never fade away.
              </p>
            </div>

            {/* Mission Section - moved here */}
            <div className="w-full flex flex-col gap-4">
              <div className="text-[#2d2d2d] text-left text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-[32px] md:leading-[36px] lg:leading-[42px]">
                Our Mission
              </div>
              <div className="max-w-[800px] text-justify">
                <p className="text-[#2d2d2d] text-[16px] md:text-[18px] font-normal leading-[26px] md:leading-[28px]">
                  To bridge the gap between physical and digital worlds, creating meaningful connections that transcend time and space. We envision a world where every precious moment can be preserved, shared, and cherished forever through the beauty of handcrafted jewelry powered by innovative technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="flex flex-col justify-center items-center gap-[40px] w-full px-4 md:px-12 lg:px-[100px] py-[60px] lg:py-[80px] bg-white">
        <div className="w-full text-[#2d2d2d] text-center text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-[32px] md:leading-[36px] lg:leading-[42px]">
          What We Do
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] lg:gap-[40px] w-full max-w-[1200px]">
          {/* Feature 1 */}
          <div className="flex flex-col items-center gap-[20px] p-[24px] bg-gray-50 rounded-[12px] hover:shadow-md transition-shadow duration-300">
            <div className="w-[60px] h-[60px] bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <div className="w-[30px] h-[30px] bg-blue-500 rounded-full"></div>
            </div>
            <div className="text-center">
              <h3 className="text-[#2d2d2d] text-[18px] font-bold leading-[24px] mb-2">NFC-Powered Jewelry</h3>
              <p className="text-[#666] text-[14px] font-normal leading-[20px]">
                A simple tap unlocks a private digital space for your memories
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center gap-[20px] p-[24px] bg-gray-50 rounded-[12px] hover:shadow-md transition-shadow duration-300">
            <div className="w-[60px] h-[60px] bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
              <div className="w-[30px] h-[30px] bg-green-500 rounded-full"></div>
            </div>
            <div className="text-center">
              <h3 className="text-[#2d2d2d] text-[18px] font-bold leading-[24px] mb-2">Handcrafted with Love</h3>
              <p className="text-[#666] text-[14px] font-normal leading-[20px]">
                Every piece blends traditional artistry with cutting-edge technology
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center gap-[20px] p-[24px] bg-gray-50 rounded-[12px] hover:shadow-md transition-shadow duration-300">
            <div className="w-[60px] h-[60px] bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
              <div className="w-[30px] h-[30px] bg-purple-500 rounded-full"></div>
            </div>
            <div className="text-center">
              <h3 className="text-[#2d2d2d] text-[18px] font-bold leading-[24px] mb-2">Secure & Personal</h3>
              <p className="text-[#666] text-[14px] font-normal leading-[20px]">
                Your memories are stored securely, accessible only to you
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Sambandha Section */}
      <div className="flex flex-col justify-center items-center gap-[40px] w-full px-4 md:px-12 lg:px-[100px] py-[60px] lg:py-[80px] bg-gray-50">
        <div className="w-full text-[#2d2d2d] text-center text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-[32px] md:leading-[36px] lg:leading-[42px]">
          Why Choose Sambandha
        </div>
        
        <div className="flex flex-col lg:flex-row justify-center items-start gap-[32px] lg:gap-[60px] w-full max-w-[1200px]">
          <div className="flex-1 space-y-[24px]">
            <div className="bg-white p-[24px] rounded-[12px] shadow-sm min-h-[110px] flex flex-col justify-start">
              <h3 className="text-[#2d2d2d] text-[16px] font-bold leading-[22px] mb-0">Modern Memory Preservation</h3>
              <p className="text-[#666] text-[14px] font-normal leading-[20px] mt-3">
                No more lost photos or forgotten messages; your treasured moments are always just a tap away.
              </p>
            </div>
            <div className="bg-white p-[24px] rounded-[12px] shadow-sm min-h-[110px] flex flex-col justify-start">
              <h3 className="text-[#2d2d2d] text-[16px] font-bold leading-[22px] mb-0">Meaningful Gifts</h3>
              <p className="text-[#666] text-[14px] font-normal leading-[20px] mt-3">
                Perfect for birthdays, anniversaries, memorials, or any special occasion.
              </p>
            </div>
          </div>
          <div className="flex-1 space-y-[24px]">
            <div className="bg-white p-[24px] rounded-[12px] shadow-sm min-h-[120px] flex flex-col justify-start">
              <h3 className="text-[#2d2d2d] text-[16px] font-bold leading-[22px] mb-0">Heritage & Innovation</h3>
              <p className="text-[#666] text-[14px] font-normal leading-[20px] mt-3">
                Inspired by Nepal's rich heritage, enhanced by modern technology.
              </p>
            </div>
            <div className="bg-white p-[24px] rounded-[12px] shadow-sm min-h-[112px] flex flex-col justify-start">
              <h3 className="text-[#2d2d2d] text-[16px] font-bold leading-[22px] mb-0">Built to Last</h3>
              <p className="text-[#666] text-[14px] font-normal leading-[20px] mt-3">
                Durable, waterproof, and designed to be cherished for a lifetime.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
