"use client";
import Image from "next/image";
import NavBar from "../../client/components/NavBar";

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
              <p className="text-[#2d2d2d] text-[15px] md:text-[16px] font-normal leading-[24px] md:leading-[26px]">
                We are a passionate team based in Kathmandu, dedicated to redefining how memories are preserved and cherished. At Sambandha, we believe that the moments that shape our lives should never fade away.
              </p>
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
            <div className="bg-white p-[24px] rounded-[12px] shadow-sm">
              <h3 className="text-[#2d2d2d] text-[16px] font-bold leading-[22px] mb-2">Modern Memory Preservation</h3>
              <p className="text-[#666] text-[14px] font-normal leading-[20px]">
                No more lost photos or forgotten messages; your treasured moments are always just a tap away.
              </p>
            </div>
            
            <div className="bg-white p-[24px] rounded-[12px] shadow-sm">
              <h3 className="text-[#2d2d2d] text-[16px] font-bold leading-[22px] mb-2">Meaningful Gifts</h3>
              <p className="text-[#666] text-[14px] font-normal leading-[20px]">
                Perfect for birthdays, anniversaries, memorials, or any special occasion.
              </p>
            </div>
          </div>
          
          <div className="flex-1 space-y-[24px]">
            <div className="bg-white p-[24px] rounded-[12px] shadow-sm">
              <h3 className="text-[#2d2d2d] text-[16px] font-bold leading-[22px] mb-2">Heritage & Innovation</h3>
              <p className="text-[#666] text-[14px] font-normal leading-[20px]">
                Inspired by Nepal's rich heritage, enhanced by modern technology.
              </p>
            </div>
            
            <div className="bg-white p-[24px] rounded-[12px] shadow-sm">
              <h3 className="text-[#2d2d2d] text-[16px] font-bold leading-[22px] mb-2">Built to Last</h3>
              <p className="text-[#666] text-[14px] font-normal leading-[20px]">
                Durable, waterproof, and designed to be cherished for a lifetime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col justify-center items-center gap-[32px] w-full px-4 md:px-12 lg:px-[100px] py-[60px] lg:py-[80px] bg-white">
        <div className="w-full text-[#2d2d2d] text-center text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-[32px] md:leading-[36px] lg:leading-[42px]">
          Our Mission
        </div>
        
        <div className="max-w-[800px] text-center">
          <p className="text-[#2d2d2d] text-[16px] md:text-[18px] font-normal leading-[26px] md:leading-[28px]">
            To bridge the gap between physical and digital worlds, creating meaningful connections that transcend time and space. We envision a world where every precious moment can be preserved, shared, and cherished forever through the beauty of handcrafted jewelry powered by innovative technology.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col justify-center items-center gap-[10px] w-full px-4 md:px-12 lg:px-[100px] pb-[70px] bg-white">
        <div className="flex pt-[70px] justify-center items-center gap-0 w-full border-t-2 border-black/20">
          <div className="flex flex-col md:flex-row justify-center items-start gap-[40px] md:gap-[190px] flex-1">
            <div className="flex flex-col justify-center items-start gap-[60px] flex-1 h-full">
              <div className="flex flex-col items-start gap-[40px] w-full">
                <div className="flex justify-center items-center gap-[5px]">
                  <Image
                    src="https://api.builder.io/api/v1/image/assets/TEMP/873d074b568ad3dc0e100f871fed99d7a0518729?width=54"
                    alt="Sambandha logo"
                    width={27}
                    height={27}
                    className="w-[27px] h-[27px]"
                  />
                  <div className="text-[#2d2d2d] text-[20px] font-bold leading-[30px]">
                    Sambandha
                  </div>
                </div>
                <div className="w-full text-[#2d2d2d] text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px]">
                  Preserving memories through beautifully crafted NFC-powered jewelry. 
                  Every piece tells a story, every tap unlocks a memory.
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 cursor-pointer hover:opacity-70 transition-opacity">
                  <svg
                    width="36"
                    height="37"
                    viewBox="0 0 36 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30 5.14624H6C5.60218 5.14624 5.22064 5.30428 4.93934 5.58558C4.65804 5.86688 4.5 6.24842 4.5 6.64624V30.6462C4.5 31.0441 4.65804 31.4256 4.93934 31.7069C5.22064 31.9882 5.60218 32.1462 6 32.1462H18.9225V21.7062H15.4155V17.6187H18.9225V14.6187C18.9225 11.1312 21.0525 9.23074 24.1725 9.23074C25.221 9.22774 26.271 9.28174 27.315 9.39124V13.0212H25.1625C23.4705 13.0212 23.1405 13.8282 23.1405 15.0087V17.6112H27.186L26.661 21.6987H23.139V32.1462H30C30.3978 32.1462 30.7794 31.9882 31.0607 31.7069C31.342 31.4256 31.5 31.0441 31.5 30.6462V6.64624C31.5 6.24842 31.342 5.86688 31.0607 5.58558C30.7794 5.30428 30.3978 5.14624 30 5.14624Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="w-9 h-9 cursor-pointer hover:opacity-70 transition-opacity">
                  <svg
                    width="36"
                    height="37"
                    viewBox="0 0 36 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.9994 11.7118C16.1599 11.7118 14.3957 12.4426 13.0949 13.7433C11.7942 15.0441 11.0634 16.8083 11.0634 18.6478C11.0634 20.4873 11.7942 22.2515 13.0949 23.5523C14.3957 24.8531 16.1599 25.5838 17.9994 25.5838C19.8389 25.5838 21.6031 24.8531 22.9039 23.5523C24.2047 22.2515 24.9354 20.4873 24.9354 18.6478C24.9354 16.8083 24.2047 15.0441 22.9039 13.7433C21.6031 12.4426 19.8389 11.7118 17.9994 11.7118ZM17.9994 23.1523C16.8043 23.1523 15.6582 22.6776 14.8132 21.8325C13.9681 20.9875 13.4934 19.8414 13.4934 18.6463C13.4934 17.4512 13.9681 16.3051 14.8132 15.4601C15.6582 14.615 16.8043 14.1403 17.9994 14.1403C19.1945 14.1403 20.3406 14.615 21.1856 15.4601C22.0307 16.3051 22.5054 17.4512 22.5054 18.6463C22.5054 19.8414 22.0307 20.9875 21.1856 21.8325C20.3406 22.6776 19.1945 23.1523 17.9994 23.1523Z"
                      fill="black"
                    />
                    <path
                      d="M25.2099 13.0738C26.103 13.0738 26.8269 12.3499 26.8269 11.4568C26.8269 10.5638 26.103 9.83981 25.2099 9.83981C24.3169 9.83981 23.5929 10.5638 23.5929 11.4568C23.5929 12.3499 24.3169 13.0738 25.2099 13.0738Z"
                      fill="black"
                    />
                    <path
                      d="M30.8004 9.81281C30.4532 8.91608 29.9225 8.10173 29.2424 7.4219C28.5623 6.74206 27.7478 6.21172 26.8509 5.86481C25.8014 5.47084 24.6927 5.25782 23.5719 5.23481C22.1274 5.17181 21.6699 5.15381 18.0069 5.15381C14.3439 5.15381 13.8744 5.15381 12.4419 5.23481C11.322 5.25664 10.214 5.46971 9.16591 5.86481C8.26881 6.21131 7.45405 6.74151 6.77391 7.4214C6.09376 8.10129 5.56325 8.91584 5.21641 9.81281C4.82236 10.8622 4.60983 11.9711 4.58791 13.0918C4.52341 14.5348 4.50391 14.9923 4.50391 18.6568C4.50391 22.3198 4.50391 22.7863 4.58791 24.2218C4.61041 25.3438 4.82191 26.4508 5.21641 27.5023C5.56422 28.399 6.09525 29.2132 6.77556 29.893C7.45587 30.5728 8.2705 31.1032 9.16741 31.4503C10.2136 31.8601 11.322 32.0884 12.4449 32.1253C13.8894 32.1883 14.3469 32.2078 18.0099 32.2078C21.6729 32.2078 22.1424 32.2078 23.5749 32.1253C24.6956 32.1025 25.8043 31.89 26.8539 31.4968C27.7505 31.1491 28.5648 30.6183 29.2449 29.9383C29.9249 29.2582 30.4557 28.4439 30.8034 27.5473C31.1979 26.4973 31.4094 25.3903 31.4319 24.2683C31.4964 22.8253 31.5159 22.3678 31.5159 18.7033C31.5159 15.0388 31.5159 14.5738 31.4319 13.1383C31.4144 12.0017 31.2008 10.8767 30.8004 9.81281ZM28.9734 24.1108C28.9637 24.9753 28.8059 25.8317 28.5069 26.6428C28.2816 27.2261 27.9368 27.7558 27.4945 28.1978C27.0522 28.6398 26.5223 28.9844 25.9389 29.2093C25.1367 29.507 24.2894 29.6648 23.4339 29.6758C22.0089 29.7418 21.6069 29.7583 17.9529 29.7583C14.2959 29.7583 13.9224 29.7583 12.4704 29.6758C11.6153 29.6653 10.7684 29.5075 9.96691 29.2093C9.38144 28.9858 8.84941 28.6418 8.40524 28.1997C7.96107 27.7576 7.61466 27.2272 7.38841 26.6428C7.09358 25.8404 6.93587 24.9941 6.92191 24.1393C6.85741 22.7143 6.84241 22.3123 6.84241 18.6583C6.84241 15.0028 6.84241 14.6293 6.92191 13.1758C6.9316 12.3118 7.08939 11.4559 7.38841 10.6453C7.84591 9.46181 8.78341 8.53031 9.96691 8.07731C10.7688 7.78052 11.6154 7.62275 12.4704 7.61081C13.8969 7.54631 14.2974 7.52831 17.9529 7.52831C21.6084 7.52831 21.9834 7.52831 23.4339 7.61081C24.2895 7.6211 25.1369 7.77892 25.9389 8.07731C26.5223 8.30272 27.0521 8.64761 27.4944 9.08985C27.9366 9.5321 28.2815 10.0619 28.5069 10.6453C28.8017 11.4477 28.9594 12.294 28.9734 13.1488C29.0379 14.5753 29.0544 14.9758 29.0544 18.6313C29.0544 22.2853 29.0544 22.6783 28.9899 24.1123H28.9734V24.1108Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-[20px] flex-1 h-full">
              <div className="w-full text-[#151313] text-[20px] font-bold leading-[22px] uppercase">
                SHOP
              </div>
              <div className="flex flex-col items-start gap-[25px] w-full">
                <div className="w-full text-[#656665] text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  New arrival
                </div>
                <div className="w-full text-[#656665] text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  Shop by category
                </div>
                <div className="w-full text-[#656665] text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  Shop by collection
                </div>
                <div className="w-full text-[#656665] text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  Gift
                </div>
              </div>
              <div className="w-full text-black/30 text-[15px] font-normal leading-[22px] uppercase">
                © 2025 — Copyright
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
