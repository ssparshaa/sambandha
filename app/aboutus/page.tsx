"use client";
import Image from "next/image";
import NavBar from "../../client/components/NavBar";

export default function AboutUs() {
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
            NFC-Powered Jewelry – A simple tap on your phone unlocks a private
            digital space where you can store and relive your memories. Seamless
            Digital Experience – Upload photos, videos, voice notes, and
            heartfelt messages that can be accessed anytime. Handcrafted with
            Love – Every piece is carefully designed and assembled, blending
            traditional artistry with cutting-edge technology. Personalized
            &amp; Secure – Your memories are stored securely, accessible only to
            you and those you choose to share them with. A Symbol of Love &amp;
            Connection – Whether it&apos;s a gift for yourself, a loved one, or
            a keepsake to remember someone special, Sambandha represents the
            emotions that words cannot always express.
          </div>

          {/* Why Sambandha section */}
          <div className="font-jost font-normal text-[21px] leading-[24px] text-sambandha-text-dark w-full">
            Why Sambandha:
          </div>

          <div className="font-jost font-normal text-[14px] leading-[19px] text-sambandha-text-muted w-full">
            A Modern Way to Preserve Memories – No more lost photos or forgotten
            messages; your most treasured moments are always just a tap away.
            Meaningful &amp; Unique Gifts – Perfect for birthdays,
            anniversaries, memorials, or any special occasion. Blending
            Tradition with Innovation – Inspired by Nepal&apos;s rich heritage
            and handcrafted to perfection, enhanced by technology. Built to Last
            – Durable, waterproof, and designed to be cherished for a lifetime.
          </div>
        </div>
      </main>
    </div>
  );
}
