import Link from 'next/link';
import Image from 'next/image';

const Footer = () => (
  <footer className="w-full border-t border-black/[0.04]" style={{ background: "linear-gradient(to bottom, transparent, #f0ece6)" }}>
    <div className="px-6 md:px-16 lg:px-24 py-10 flex flex-col md:flex-row items-start justify-between gap-8">

      {/* Brand */}
      <div className="flex flex-col gap-3 max-w-[220px]">
        <Image src="/logofooter.png" alt="Sambandha" width={110} height={28} className="h-12 w-auto object-contain object-left" />
        <p className="text-xs text-[#aaa] leading-relaxed">
          A meaningful piece designed to celebrate love, memories, and the people who matter most.
        </p>
      </div>

      {/* Links */}
      <div className="flex gap-12 text-xs text-[#888]">
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-[#bbb]">Shop</span>
          <Link href="/product" className="hover:text-[#2d2d2d] transition-colors">All Products</Link>
          <Link href="/product" className="hover:text-[#2d2d2d] transition-colors">New Arrival</Link>
          <Link href="/product" className="hover:text-[#2d2d2d] transition-colors">Gift</Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-[#bbb]">Connect</span>
          <a href="https://www.instagram.com/sambandha.co/" target="_blank" rel="noopener noreferrer" className="hover:text-[#2d2d2d] transition-colors">Instagram</a>
          <a href="https://www.facebook.com/share/1DH14PmvX9/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-[#2d2d2d] transition-colors">Facebook</a>
          <a href="mailto:hellosambandha@gmail.com" className="hover:text-[#2d2d2d] transition-colors">hellosambandha@gmail.com</a>
        </div>
      </div>

    </div>

    {/* Bottom bar */}
    <div className="border-t border-black/[0.04] px-6 md:px-16 lg:px-24 py-4">
      <p className="text-[11px] text-[#ccc] tracking-widest uppercase">
        © 2025 Sambandha — All rights reserved
      </p>
    </div>
  </footer>
);

export default Footer;
