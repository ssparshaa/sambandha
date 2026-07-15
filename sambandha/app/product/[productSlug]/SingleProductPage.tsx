"use client";

import { useMemo, useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import NavBar from "client/components/NavBar";
import Footer from "client/components/Footer";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useQuery } from "@tanstack/react-query";
import api from "config/api";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CURRENCY_RATES = { NPR: 1, USD: 0.0072, EUR: 0.0061, GBP: 0.0053, INR: 0.65, RUB: 0.6 };
const CURRENCY_SYMBOLS = { NPR: "Rs", USD: "$", EUR: "€", GBP: "£", INR: "₹", RUB: "₽" };
type Currency = keyof typeof CURRENCY_RATES;

const fetchProduct = async (slug: string) => {
  const { data } = await api.get(`/product/single/${slug}`);
  return data;
};
const fetchProducts = async () => {
  const { data } = await api.get("/product");
  return data;
};

export default function SingleProductPage({ productSlug }: { productSlug: string }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ["singleProduct", productSlug],
    queryFn: () => fetchProduct(productSlug),
    enabled: !!productSlug,
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
  });

  const [currency, setCurrency] = useState<Currency>("NPR");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const convertedPrice = product
    ? (product.price * CURRENCY_RATES[currency]).toFixed(2)
    : "0";

  const handleAddToBag = () => {
    if (!product) return;
    const cartItem: CartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      color: selectedColor || product.colors?.[0] || "",
      image: product.images[0],
      currency,
      convertedPrice: parseFloat(convertedPrice),
    };
    addItem(cartItem);
    openCart();
  };

  const moreProductsToShow = useMemo(() => {
    if (!products || products.length === 0) return [];
    const filtered = products.filter((p: any) => p.slug !== productSlug);
    return filtered.slice(0, 4);
  }, [products, productSlug]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavBar />
        <div className="flex-1 px-6 md:px-16 lg:px-24 pt-28 pb-20 animate-pulse">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2 aspect-square bg-gray-100 rounded-2xl" />
            <div className="flex-1 flex flex-col gap-6 pt-4">
              <div className="h-8 bg-gray-100 rounded w-2/3" />
              <div className="h-6 bg-gray-100 rounded w-1/4" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar />

      {/* ── Product section ── */}
      <div className="flex-1 px-6 md:px-16 lg:px-24 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Left — images */}
          <div className="w-full lg:w-[48%] flex flex-col gap-3">
            {/* Main image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50">
              <Image
                src={product.images?.[activeImage] || product.images?.[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === i ? "border-gray-900" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — details */}
          <div className="w-full lg:flex-1 min-w-0 flex flex-col gap-7 lg:pt-4">

            {/* Name */}
            <div>
              <h1
                className="text-3xl md:text-4xl text-gray-900 leading-tight mb-3"
                style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}
              >
                {product.name}
              </h1>
              {/* Price row */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xl font-semibold text-gray-900">
                  {CURRENCY_SYMBOLS[currency]}{" "}
                  {currency === "NPR" ? product.price.toLocaleString() : convertedPrice}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      {CURRENCY_SYMBOLS[currency]}{" "}
                      {currency === "NPR"
                        ? product.originalPrice.toLocaleString()
                        : (product.originalPrice * CURRENCY_RATES[currency]).toFixed(2)}
                    </span>
                    <span className="text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="text-xs border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 bg-white focus:outline-none cursor-pointer"
                >
                  {Object.keys(CURRENCY_RATES).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Color */}
            {product.colors?.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <span className="text-xs uppercase tracking-widest text-gray-400">Color</span>
                <div className="flex gap-2.5">
                  {product.colors.map((color: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                        (selectedColor || product.colors[0]) === color
                          ? "border-gray-900 scale-110"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs uppercase tracking-widest text-gray-400">Quantity</span>
              <div className="flex items-center gap-0 border border-gray-200 rounded-full w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-medium text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to bag */}
            <button
              onClick={handleAddToBag}
              className="w-full h-12 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium transition-colors duration-200"
            >
              Add to Bag ({quantity})
            </button>

            <div className="w-full h-px bg-gray-100" />

            {/* Description */}
            {product.description && (
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-gray-400">Description</span>
                <div
                  className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none overflow-hidden break-words"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── More Products ── */}
      {moreProductsToShow.length > 0 && (
        <div className="px-6 md:px-16 lg:px-24 py-14 border-t border-gray-100">
          <h2
            className="text-2xl text-gray-900 mb-8"
            style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}
          >
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {moreProductsToShow.map((p: any) => (
              <div
                key={p._id}
                onClick={() => router.push(`/product/${p.slug}`)}
                className="group cursor-pointer flex flex-col gap-3"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50">
                  <Image
                    src={p.images?.[0]}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    sizes="256px"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-800">{p.name}</h3>
                    <ArrowUpRight size={16} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">Rs {p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
