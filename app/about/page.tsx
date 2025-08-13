"use client";
import Image from "next/image";
import NavBar from "../../client/components/NavBar";

export default function About() {
  return (
    <div>
      <NavBar />
      {/* Main Content */}
      <main className="flex flex-col lg:flex-row justify-center items-start gap-5 w-full px-6 lg:px-[38px] flex-1">
        {/* Hero Image */}
        <div className="flex flex-col items-center flex-1 w-full">
          <Image
            src="https://api.builder.io/api/v1/image/assets/TEMP/cbabca9cf727b25bf1b48e1af27aa43972db37cb?width=1344"
            alt="Sambandha NFC jewelry collection"
            width={672}
            height={400}
            className="w-full h-auto object-cover rounded-[12px]"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center items-start gap-[14px] flex-1 px-5 lg:px-[20px] py-8 lg:py-0">
          {/* Main Heading */}
          <div className="w-full">
            <h1 className="font-reckless font-normal text-[32px] lg:text-[52px] leading-[40px] lg:leading-[63px] text-sambandha-text-dark flex-1">
              Sambandha – Where Memories Live Forever
            </h1>
          </div>

          {/* Company Description */}
          <div className="font-jost font-normal text-[14px] leading-[19px] text-sambandha-text-muted w-full">
            We are a small but passionate team based in Kathmandu, dedicated to
            redefining how memories are preserved and cherished. At Sambandha,
            we believe that the moments that shape our lives should never fade
            away. That&apos;s why we have combined timeless craftsmanship with
            modern technology to create NFC-powered jewelry that holds more than
            just beauty—it holds memories, emotions, and connections that last
            forever.
          </div>

          {/* What we do section */}
          <div className="font-jost font-normal text-[21px] leading-[24px] text-sambandha-text-dark w-full">
            What we do:
          </div>

          <div className="font-jost font-normal text-[14px] leading-[19px] text-sambandha-text-muted w-full">
            <strong>NFC-Powered Jewelry</strong> – A simple tap on your phone unlocks a private
            digital space where you can store and relive your memories. 
            <br /><br />
            <strong>Seamless Digital Experience</strong> – Upload photos, videos, voice notes, and
            heartfelt messages that can be accessed anytime. 
            <br /><br />
            <strong>Handcrafted with Love</strong> – Every piece is carefully designed and assembled, blending
            traditional artistry with cutting-edge technology. 
            <br /><br />
            <strong>Personalized &amp; Secure</strong> – Your memories are stored securely, accessible only to
            you and those you choose to share them with. 
            <br /><br />
            <strong>A Symbol of Love &amp; Connection</strong> – Whether it&apos;s a gift for yourself, a loved one, or
            a keepsake to remember someone special, Sambandha represents the
            emotions that words cannot always express.
          </div>

          {/* Why Sambandha section */}
          <div className="font-jost font-normal text-[21px] leading-[24px] text-sambandha-text-dark w-full mt-6">
            Why Sambandha:
          </div>

          <div className="font-jost font-normal text-[14px] leading-[19px] text-sambandha-text-muted w-full">
            <strong>A Modern Way to Preserve Memories</strong> – No more lost photos or forgotten
            messages; your most treasured moments are always just a tap away.
            <br /><br />
            <strong>Meaningful &amp; Unique Gifts</strong> – Perfect for birthdays,
            anniversaries, memorials, or any special occasion. 
            <br /><br />
            <strong>Blending Tradition with Innovation</strong> – Inspired by Nepal&apos;s rich heritage
            and handcrafted to perfection, enhanced by technology. 
            <br /><br />
            <strong>Built to Last</strong> – Durable, waterproof, and designed to be cherished for a lifetime.
          </div>

          {/* Our Mission */}
          <div className="font-jost font-normal text-[21px] leading-[24px] text-sambandha-text-dark w-full mt-6">
            Our Mission:
          </div>

          <div className="font-jost font-normal text-[14px] leading-[19px] text-sambandha-text-muted w-full">
            To bridge the gap between physical and digital worlds, creating meaningful connections 
            that transcend time and space. We envision a world where every precious moment can be 
            preserved, shared, and cherished forever through the beauty of handcrafted jewelry 
            powered by innovative technology.
          </div>
        </div>
      </main>
    </div>
  );
}
