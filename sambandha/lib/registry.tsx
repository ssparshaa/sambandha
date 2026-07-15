"use client";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useState } from "react";

export default function StyledJsxRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache] = useState(() => createCache({ key: "css" }));

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(" "),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
