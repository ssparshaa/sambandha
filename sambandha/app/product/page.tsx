"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NavBar from "client/components/NavBar";
import Footer from "client/components/Footer";
import api from "config/api";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  colors: string[];
  description: string;
}

export default function ProductsPage() {
  const router = useRouter();

  const { data: products, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/product");
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar />

      <main className="flex-1 px-6 md:px-16 lg:px-24 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">
            Sambandha Collection
          </p>
          <h1
            className="text-3xl md:text-4xl text-gray-900"
            style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}
          >
            All Products
          </h1>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col gap-3">
                <div className="w-full aspect-square bg-gray-100 rounded-lg" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <p className="text-sm text-red-400">
            {(error as any)?.message || "Could not load products."}
          </p>
        )}

        {/* Empty */}
        {!isLoading && products?.length === 0 && (
          <p className="text-sm text-gray-400">No products available yet.</p>
        )}

        {/* Grid */}
        {products && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => router.push(`/product/${product.slug}`)}
                className="group cursor-pointer flex flex-col gap-3"
              >
                {/* Image */}
                <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-50 relative">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm md:text-base font-medium text-gray-800 leading-snug truncate">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Rs {product.price.toLocaleString()}
                  </p>
                  {product.colors?.length > 0 && (
                    <div className="flex gap-1.5 mt-0.5">
                      {product.colors.map((color, ci) => (
                        <span
                          key={ci}
                          className="w-3.5 h-3.5 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
