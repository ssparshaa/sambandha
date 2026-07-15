"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus } from "lucide-react";

type Layout = "solo" | "classic4" | "trio" | "twin";
type Screen = "splash" | "layout" | "camera" | "preview";

const LAYOUTS: { id: Layout; label: string }[] = [
  { id: "solo",     label: "Solo Shot"  },
  { id: "classic4", label: "Classic 4"  },
  { id: "trio",     label: "Trio Shot"  },
  { id: "twin",     label: "Twin Strip" },
];

const PHOTO_COUNT: Record<Layout, number> = {
  solo:     1,
  classic4: 4,
  trio:     3,
  twin:     6,
};

// ── Manually set preview images for each layout card ──
const LAYOUT_PREVIEW_IMAGES: Record<Layout, string> = {
  solo:     "https://i.pinimg.com/736x/81/29/6b/81296b5e61f471a7b41a72265afd94d8.jpg",
  classic4: "https://i.pinimg.com/736x/2e/3f/21/2e3f210c94e157e7f1aa257d583a0b32.jpg",
  trio:     "https://i.pinimg.com/736x/5a/7a/d9/5a7ad9ba8679dc3b9b493efa582e3233.jpg",
  twin:     "https://i.pinimg.com/736x/ed/d3/12/edd312ecf4df9e17b26144e70dc2cc2f.jpg",
};

/* ── Helpers ── */
function todayMMDDYY() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}-${dd}-${yy}`;
}

// ── Customize your print card here ──
const EVENT_NAME = "Nina Bonita's 65th Birthday"; // ← change this
const EVENT_DATE = todayMMDDYY();                  // auto-fills today's date

const bwStyle: React.CSSProperties = {
  filter: "grayscale(100%) contrast(120%)",
};

/* ── Back button ── */
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1 text-gray-500 hover:text-gray-900 transition-colors"
      aria-label="Back"
    >
      <ArrowLeft className="w-5 h-5" strokeWidth={1.8} />
    </button>
  );
}

/* ── Camera screen ── */
function CameraScreen({
  layout,
  onDone,
  onBack,
}: {
  layout: Layout;
  onDone: (photos: string[]) => void;
  onBack: () => void;
}) {
  const total = PHOTO_COUNT[layout];
  const videoRef  = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [countdown, setCountdown]     = useState<number | null>(null);
  const [flash, setFlash]             = useState(false);
  const [photosTaken, setPhotosTaken] = useState(0);
  const photosRef = useRef<string[]>([]);

  useEffect(() => {
    let active = true;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        if (!active) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Camera error:", err));
    return () => {
      active = false;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  const captureFrame = useCallback((): string => {
    const video  = videoRef.current!;
    const canvas = canvasRef.current!;
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")!.drawImage(video, 0, 0);
    return canvas.toDataURL("image/png");
  }, []);

  const afterCapture = useCallback((photo: string) => {
    photosRef.current = [...photosRef.current, photo];
    const next = photosRef.current.length;
    setPhotosTaken(next);
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      if (next >= total) {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        onDone(photosRef.current);
      } else {
        runCountdown();
      }
    }, 800);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, onDone]);

  const runCountdown = useCallback(() => {
    let count = 5;
    setCountdown(count);
    const id = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(id);
        setCountdown(null);
        afterCapture(captureFrame());
      } else {
        setCountdown(count);
      }
    }, 1000);
  }, [afterCapture, captureFrame]);

  const handleStart = () => {
    if (countdown !== null || flash) return;
    runCountdown();
  };

  const busy = countdown !== null || flash;

  return (
    <div className="min-h-screen bg-white sm:bg-[#f5f5f5] flex items-start sm:items-center justify-center">
      <div
        className="w-full bg-white sm:max-w-[820px] flex flex-col px-4 sm:px-8 py-8 sm:py-10"
        style={{ minHeight: "100svh" }}
      >
        <div className="flex items-center justify-between mb-5">
          <BackButton onClick={onBack} />
          <div className="flex items-baseline gap-1 flex-1 justify-center">
            <span className="text-[11px] sm:text-[13px] tracking-[0.35em] uppercase text-gray-700 font-medium">THE</span>
            <span className="text-[22px] sm:text-[26px] text-gray-900 leading-tight mx-1" style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}>Receipt</span>
            <span className="text-[11px] sm:text-[13px] tracking-[0.35em] uppercase text-gray-700 font-medium">PHOTOBOOTH</span>
          </div>
          <div className="w-6" />
        </div>

        {photosTaken > 0 && (
          <p className="text-center text-xs text-gray-500 mb-2 tracking-wide">Photo {Math.min(photosTaken + 1, total)} of {total}</p>
        )}
        {photosTaken === 0 && countdown === null && !flash && (
          <p className="text-center text-xs text-gray-400 mb-2 tracking-wide">{total} photo{total > 1 ? "s" : ""} will be taken</p>
        )}
        {countdown !== null && (
          <p className="text-center text-xs text-gray-500 mb-2 tracking-wide">Photo {photosTaken + 1} of {total}</p>
        )}

        <div className="relative w-full overflow-hidden bg-black" style={{ height: "60vh", borderRadius: "12px" }}>
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="text-white font-bold" style={{ fontSize: "clamp(80px,20vw,120px)", lineHeight: 1, textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}>{countdown}</span>
            </div>
          )}
          {flash && <div className="absolute inset-0 bg-white" style={{ opacity: 0.9 }} />}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <div className="flex flex-col items-center gap-2 mt-6">
          <Button onClick={handleStart} disabled={busy} className="rounded-full px-8 py-5 h-auto bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white text-sm tracking-widest font-normal">
            tap here to take a photo
          </Button>
          <p className="text-[10px] text-gray-400 text-center italic mt-1">a 5-second countdown will start once you tap the button</p>
        </div>
      </div>
    </div>
  );
}

/* ── Photo grid for preview ── */
function CapturedGrid({ layout, photos }: { layout: Layout; photos: string[] }) {
  const imgStyle: React.CSSProperties = { ...bwStyle, objectFit: "cover", width: "100%", height: "100%", display: "block" };

  if (layout === "solo") {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {photos[0] && <img src={photos[0]} alt="" style={imgStyle} />}
      </div>
    );
  }
  if (layout === "classic4") {
    return (
      <div className="grid grid-cols-2 gap-[2px] w-full h-full">
        {[0,1,2,3].map((i) => (
          <div key={i} className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
            {photos[i] && <img src={photos[i]} alt="" style={imgStyle} />}
          </div>
        ))}
      </div>
    );
  }
  if (layout === "trio") {
    return (
      <div className="flex flex-col gap-[2px] w-full h-full">
        {[0,1,2].map((i) => (
          <div key={i} className="flex-1 overflow-hidden w-full">{photos[i] && <img src={photos[i]} alt="" style={imgStyle} />}</div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-[2px] w-full h-full">
      {[0,1,2,3,4,5].map((i) => (
        <div key={i} className="overflow-hidden" style={{ aspectRatio: "1/1.1" }}>
          {photos[i] && <img src={photos[i]} alt="" style={imgStyle} />}
        </div>
      ))}
    </div>
  );
}

/* ── Preview screen ── */
function PreviewScreen({
  layout,
  photos,
  onRetake,
  onBack,
}: {
  layout: Layout;
  photos: string[];
  onRetake: () => void;
  onBack: () => void;
}) {
  const [mirrorCount, setMirrorCount] = useState(1);

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #polaroid-print, #polaroid-print * { visibility: visible !important; }
          #polaroid-print { position: fixed !important; inset: 0 !important; display: flex !important; align-items: center !important; justify-content: center !important; margin: 0 !important; padding: 0 !important; }
          @page { margin: 0; size: auto; }
        }
      `}</style>

      <div className="min-h-screen bg-white sm:bg-[#f5f5f5] flex items-start sm:items-center justify-center">
        <div className="w-full bg-white sm:max-w-[820px] flex flex-col px-4 sm:px-8 py-8 sm:py-10" style={{ minHeight: "100svh" }}>

          {/* Header with back button */}
          <div className="flex items-center justify-between mb-6">
            <BackButton onClick={onBack} />
            <div className="flex items-baseline gap-1 flex-1 justify-center">
              <span className="text-[11px] sm:text-[13px] tracking-[0.35em] uppercase text-gray-700 font-medium">THE</span>
              <span className="text-[22px] sm:text-[26px] text-gray-900 leading-tight mx-1" style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}>Receipt</span>
              <span className="text-[11px] sm:text-[13px] tracking-[0.35em] uppercase text-gray-700 font-medium">PHOTOBOOTH</span>
            </div>
            <div className="w-6" />
          </div>

          {/* Print card — matches the screenshot style */}
          <div
            id="polaroid-print"
            className="w-full mx-auto flex flex-col"
            style={{
              maxWidth: "400px",
              backgroundColor: "#fff",
              border: "1px solid #bbb",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            {/* Logo header */}
            <div className="flex items-baseline justify-center gap-1 py-3">
              <span className="text-[9px] tracking-[0.25em] uppercase text-gray-820 font-medium">THE</span>
              <span className="text-[14px] text-gray-900 mx-0.5" style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}>Receipt</span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-gray-820 font-medium">PHOTOBOOTH</span>
            </div>

            {/* Photo area — with padding on sides */}
            <div className="w-full" style={{ padding: "0 12px", boxSizing: "border-box", aspectRatio: layout === "twin" ? "2/3" : "3/4" }}>
              <CapturedGrid layout={layout} photos={photos} />
            </div>

            {/* Footer: event name + date */}
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[9px] text-gray-700 tracking-wide">{EVENT_NAME}</span>
              <span className="text-[9px] text-gray-500 font-mono">{EVENT_DATE}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-2 mt-6 w-full max-w-[320px] mx-auto">
            <Button variant="outline" className="rounded-full text-xs px-4 py-4 h-auto border-gray-300 text-gray-700 hover:bg-gray-50 flex-1" onClick={onRetake}>RETAKE</Button>
            <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-2 flex-1 justify-center">
              <span className="text-[10px] text-gray-500 font-medium mr-1">MIRROR</span>
              <button className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-30" onClick={() => setMirrorCount((n) => Math.max(1, n - 1))} disabled={mirrorCount <= 1}>
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-[11px] font-semibold text-gray-800 w-4 text-center">{mirrorCount}</span>
              <button className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-30" onClick={() => setMirrorCount((n) => Math.min(4, n + 1))} disabled={mirrorCount >= 4}>
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <Button className="rounded-full text-xs px-4 py-4 h-auto bg-gray-900 hover:bg-gray-700 text-white flex-1" onClick={() => window.print()}>PRINT</Button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Shared outer wrapper ── */
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white sm:bg-[#f5f5f5] flex items-start sm:items-center justify-center">
      <div className="w-full bg-white sm:max-w-[820px] flex flex-col" style={{ minHeight: "100svh" }}>
        {children}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function PhotoboothPage() {
  const [screen, setScreen]                 = useState<Screen>("splash");
  const [selectedLayout, setSelectedLayout] = useState<Layout | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

  /* ── Splash ── */
  if (screen === "splash") {
    return (
      <PageShell>
        <div className="flex flex-col flex-1 px-4 sm:px-8 pt-10 pb-10 sm:pt-16 sm:pb-16" style={{ minHeight: "100svh" }}>
          {/* Logo */}
          <div className="flex flex-col items-center leading-none mt-6 mb-8">
            <span className="text-[11px] sm:text-[13px] tracking-[0.35em] uppercase text-gray-700 font-medium">THE</span>
            <span className="text-[52px] sm:text-[64px] text-gray-900 leading-tight" style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}>Receipt</span>
            <span className="text-[11px] sm:text-[13px] tracking-[0.35em] uppercase text-gray-700 font-medium">PHOTOBOOTH</span>
          </div>

          {/* Image — grows to fill all available space */}
          <div className="flex-1 flex items-center justify-center w-full min-h-0">
            <img
              src="https://i.pinimg.com/736x/14/32/f3/1432f3777adb83457bf5fb53cd207380.jpg"
              alt=""
              style={{ width: "100%", maxWidth: "420px", maxHeight: "100%", objectFit: "contain", display: "block" }}
            />
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col items-center gap-4 pt-8 pb-4">
            <p className="text-xs sm:text-sm italic text-gray-400 text-center tracking-wide">a new way to capture your moments.</p>
            <Button onClick={() => setScreen("layout")} className="rounded-full px-10 py-5 h-auto bg-gray-900 hover:bg-gray-700 text-white text-sm tracking-widest font-normal">
              tap to start
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  /* ── Layout selection ── */
  if (screen === "layout") {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "820px", backgroundColor: "#fff", padding: "24px 24px 32px", boxSizing: "border-box" }}>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <BackButton onClick={() => setScreen("splash")} />
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "8px" }}>
                <span style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111" }}>CHOOSE</span>
                <span style={{ fontSize: "24px", fontFamily: "var(--font-instrument-serif)", fontStyle: "italic", color: "#111" }}>Photo</span>
                <span style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111" }}>LAYOUT</span>
              </div>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>choose how you want your memories printed</p>
            </div>
            <div style={{ width: "28px" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "0 20px" }}>
            {LAYOUTS.map(({ id, label }) => (
              <div key={id} onClick={() => { setSelectedLayout(id); setScreen("camera"); }} style={{ cursor: "pointer" }}>
                <div style={{
                  outline: selectedLayout === id ? "2px solid #333" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                }}>
                  <img
                    src={LAYOUT_PREVIEW_IMAGES[id]}
                    alt={label}
                    style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
                  />
                </div>
                <div style={{ marginTop: "8px", fontSize: "12px", fontWeight: 700, color: "#222", textAlign: "center", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "28px", display: "flex", alignItems: "baseline", justifyContent: "center", gap: "5px" }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af", fontWeight: 500 }}>THE</span>
            <span style={{ fontSize: "15px", color: "#9ca3af", fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}>Receipt</span>
            <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af", fontWeight: 500 }}>PHOTOBOOTH</span>
          </div>

        </div>
      </div>
    );
  }

  /* ── Camera ── */
  if (screen === "camera" && selectedLayout) {
    return (
      <CameraScreen
        layout={selectedLayout}
        onDone={(photos) => { setCapturedPhotos(photos); setScreen("preview"); }}
        onBack={() => setScreen("layout")}
      />
    );
  }

  /* ── Preview ── */
  if (screen === "preview" && selectedLayout) {
    return (
      <PreviewScreen
        layout={selectedLayout}
        photos={capturedPhotos}
        onRetake={() => { setCapturedPhotos([]); setScreen("camera"); }}
        onBack={() => { setCapturedPhotos([]); setScreen("layout"); }}
      />
    );
  }

  return null;
}