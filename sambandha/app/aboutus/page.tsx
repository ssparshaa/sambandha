import NavBar from "client/components/NavBar";
import Footer from "client/components/Footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      <NavBar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 pt-36 pb-24 text-center">

        <p className="text-xs uppercase tracking-[0.25em] text-[#bbb] mb-4">Our Story</p>

        <h1
          className="text-4xl md:text-5xl text-[#2d2d2d] leading-tight mb-6 max-w-xl"
          style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}
        >
          From the Himalayas,<br />to the world.
        </h1>

        <p className="text-sm text-[#999] leading-relaxed max-w-md mb-10">
          We're a small team from Nepal who believe that love deserves to be carried not just felt. Sambandha was born from a simple idea: the people and moments that matter most should always be close, no matter the distance.
        </p>

        <div className="w-8 h-px bg-[#ccc]" />

        <p className="mt-8 text-xs text-[#bbb] tracking-wide">
          Made with care · Kathmandu, Nepal <br></br>
          hellosambandha@gmail.com
        </p>

      </main>

      <Footer />
    </div>
  );
}
