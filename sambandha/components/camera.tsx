// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import { X, RotateCcw, Zap, ZapOff } from "lucide-react";

// interface CameraProps {
//   onCapture: (photo: string) => void;
//   onClose: () => void;
// }

// const Camera: React.FC<CameraProps> = ({ onCapture, onClose }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const [facingMode, setFacingMode] = useState<"user" | "environment">(
//     "environment",
//   );
//   const [flashOn, setFlashOn] = useState(false);
//   const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
//   const [torchSupported, setTorchSupported] = useState(false);

//   // Check if device has multiple cameras
//   useEffect(() => {
//     const checkCameras = async () => {
//       try {
//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const videoDevices = devices.filter(
//           (device) => device.kind === "videoinput",
//         );
//         setHasMultipleCameras(videoDevices.length > 1);
//       } catch (err) {
//         console.error("Error checking cameras:", err);
//       }
//     };
//     checkCameras();
//   }, []);

//   // Start camera
//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         // Stop previous stream if exists
//         if (streamRef.current) {
//           streamRef.current.getTracks().forEach((track) => track.stop());
//         }

//         const constraints: any = {
//           video: {
//             facingMode: facingMode,
//             width: { ideal: 1920 },
//             height: { ideal: 1080 },
//           },
//         };

//         const mediaStream = await navigator.mediaDevices.getUserMedia(
//           constraints,
//         );

//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream;
//         }
//         streamRef.current = mediaStream;

//         // Check if torch is supported and apply it
//         const videoTrack = mediaStream.getVideoTracks()[0];
//         const capabilities: any = videoTrack.getCapabilities();

//         if (capabilities.torch) {
//           setTorchSupported(true);
//           // Apply current flash state
//           try {
//             await videoTrack.applyConstraints({
//               advanced: [{ torch: flashOn }],
//             } as any);
//           } catch (e) {
//             console.log("Torch constraint failed:", e);
//           }
//         } else {
//           setTorchSupported(false);
//         }
//       } catch (err) {
//         console.error("Error accessing camera:", err);
//         alert(
//           "Unable to access camera. Please ensure camera permissions are granted.",
//         );
//       }
//     };

//     startCamera();

//     // Cleanup function
//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop());
//         streamRef.current = null;
//       }
//       if (videoRef.current) {
//         videoRef.current.srcObject = null;
//       }
//     };
//   }, [facingMode]); // Only re-run when facingMode changes

//   // Control torch/flash independently
//   useEffect(() => {
//     const toggleTorch = async () => {
//       if (!streamRef.current) return;

//       const videoTrack = streamRef.current.getVideoTracks()[0];
//       if (!videoTrack) return;

//       const capabilities: any = videoTrack.getCapabilities();

//       if (capabilities.torch) {
//         try {
//           await videoTrack.applyConstraints({
//             advanced: [{ torch: flashOn }],
//           } as any);
//           console.log(`Torch ${flashOn ? "ON" : "OFF"}`);
//         } catch (err) {
//           console.error("Error toggling torch:", err);
//         }
//       }
//     };

//     toggleTorch();
//   }, [flashOn]); // Run whenever flashOn changes

//   const handleCapture = () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const photo = canvas.toDataURL("image/png");

//     // Stop camera before calling onCapture
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }

//     onCapture(photo);
//   };

//   const handleClose = () => {
//     // Stop all camera tracks
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//     onClose();
//   };

//   const switchCamera = () => {
//     setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4"
//       onClick={handleClose}
//     >
//       <div
//         className="w-full max-w-sm bg-white rounded-3xl md:rounded-[3rem] shadow-2xl overflow-hidden relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Camera Viewfinder */}
//         <div className="relative p-4 md:p-6">
//           <div className="bg-black rounded-2xl md:rounded-3xl overflow-hidden border-4 md:border-8 border-black aspect-[3/4] relative">
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               muted
//               className="w-full h-full object-cover"
//             />

//             {/* Top Controls */}
//             {/* <div className="absolute top-2 md:top-4 left-0 right-0 px-2 md:px-4 flex items-center justify-between">
//               <button
//                 onClick={handleClose}
//                 className="text-white/90 hover:text-white bg-black/30 rounded-full p-2"
//               >
//                 <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
//               </button>

//               {flashOn && (
//                 <div className="bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full">
//                   <span className="text-yellow-400 text-xs font-medium">
//                     Flash ON
//                   </span>
//                 </div>
//               )}
//             </div> */}
//             {/* Top Controls */}
//             <div className="absolute top-2 md:top-4 left-0 right-0 px-2 md:px-4 flex items-center justify-between">
//               <button
//                 onClick={handleClose}
//                 className="text-white/90 hover:text-white bg-black/30 rounded-full p-2"
//               >
//                 <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
//               </button>

//               {flashOn && (
//                 <div className="bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full">
//                   <span className="text-yellow-400 text-xs font-medium">
//                     Flash ON
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Bottom Left - Date and Time */}
//             <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 text-white/90 text-[10px] md:text-xs font-mono">
//               <div className="flex flex-col leading-tight">
//                 <span>NOV 05, 2025</span>
//                 <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()}</span>
//               </div>
//             </div>

//             {/* Bottom Right - Battery Icon */}
//             <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 text-white/90">
//               <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <rect x="2" y="7" width="18" height="10" rx="1" />
//                 <rect x="4" y="9" width="12" height="6" fill="currentColor" fillOpacity="0.8" />
//                 <path d="M20 10v4" strokeLinecap="round" />
//               </svg>
//             </div>
            
//           </div>

//           {/* Camera Controls */}
//           <div className="mt-6 md:mt-8 flex items-center justify-center gap-8 md:gap-12">
//             <button
//               onClick={() => setFlashOn(!flashOn)}
//               disabled={!torchSupported}
//               className={`px-4 md:px-6 py-2 rounded-full transition-all ${
//                 flashOn
//                   ? "bg-yellow-400 text-gray-900 shadow-lg"
//                   : torchSupported
//                   ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                   : "bg-gray-100 text-gray-400 cursor-not-allowed"
//               }`}
//               title={
//                 !torchSupported
//                   ? "Flash not supported on this camera"
//                   : flashOn
//                   ? "Turn flash off"
//                   : "Turn flash on"
//               }
//             >
//               {flashOn ? (
//                 <Zap
//                   className="w-4 h-4 md:w-5 md:h-5"
//                   strokeWidth={2}
//                   fill="currentColor"
//                 />
//               ) : (
//                 <ZapOff className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
//               )}
//             </button>

//             <button
//               onClick={handleCapture}
//               className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-all active:scale-95 shadow-lg"
//               title="Take photo"
//             >
//               <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-gray-900"></div>
//             </button>

//             <button
//               onClick={switchCamera}
//               className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-all active:scale-95 shadow-md"
//               title="Switch camera"
//             >
//               <RotateCcw
//                 className="w-5 h-5 md:w-6 md:h-6 text-gray-700"
//                 strokeWidth={2}
//               />
//             </button>
//           </div>
//         </div>

//         <canvas ref={canvasRef} className="hidden" />
//       </div>
//     </div>
//   );
// };

// export default Camera;

"use client";

import React, { useRef, useState, useEffect } from "react";
import { X, RotateCcw, Zap, ZapOff } from "lucide-react";

interface CameraProps {
  onCapture: (photo: string) => void;
  onClose: () => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  );
  const [flashOn, setFlashOn] = useState(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);

  useEffect(() => {
    const checkCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );
        setHasMultipleCameras(videoDevices.length > 1);
      } catch (err) {
        console.error("Error checking cameras:", err);
      }
    };
    checkCameras();
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }

        const constraints: any = {
          video: {
            facingMode: facingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(
          constraints,
        );

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        streamRef.current = mediaStream;

        const videoTrack = mediaStream.getVideoTracks()[0];
        const capabilities: any = videoTrack.getCapabilities();

        if (capabilities.torch) {
          setTorchSupported(true);
          try {
            await videoTrack.applyConstraints({
              advanced: [{ torch: flashOn }],
            } as any);
          } catch (e) {
            console.log("Torch constraint failed:", e);
          }
        } else {
          setTorchSupported(false);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert(
          "Unable to access camera. Please ensure camera permissions are granted.",
        );
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [facingMode]);

  useEffect(() => {
    const toggleTorch = async () => {
      if (!streamRef.current) return;

      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (!videoTrack) return;

      const capabilities: any = videoTrack.getCapabilities();

      if (capabilities.torch) {
        try {
          await videoTrack.applyConstraints({
            advanced: [{ torch: flashOn }],
          } as any);
          console.log(`Torch ${flashOn ? "ON" : "OFF"}`);
        } catch (err) {
          console.error("Error toggling torch:", err);
        }
      }
    };

    toggleTorch();
  }, [flashOn]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photo = canvas.toDataURL("image/png");

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    onCapture(photo);
  };

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    onClose();
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-[50px] md:rounded-[3rem] shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-5 md:p-6">
          <div className="bg-black rounded-[40px] md:rounded-3xl overflow-hidden border-7 border-t-4 border-l-4 border-r-4 border-b-[10px] md:border-t-8 md:border-l-8 md:border-r-8 md:border-b-9 border-black aspect-[3/4] relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            <div className="absolute top-2 md:top-4 left-0 right-0 px-2 md:px-4 flex items-center justify-between">
              <button
                onClick={handleClose}
                className="text-white/90 hover:text-white bg-black/30 rounded-full p-2"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
              </button>

              {flashOn && (
                <div className="bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-yellow-400 text-xs font-medium">
                    Flash ON
                  </span>
                </div>
              )}
            </div>

            <div className="absolute bottom-10 md:bottom-10 left-2 md:left-3 text-white/90 text-[10px] md:text-xs font-mono">
              <div className="flex flex-col leading-tight">
                <span>NOV 05, 2025</span>
                <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()}</span>
              </div>
            </div>

            <div className="absolute bottom-10 md:bottom-10 right-2 md:right-3 text-white/90">
              <svg className="w-5 h-5 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="18" height="10" rx="1" />
                <rect x="4" y="9" width="12" height="6" fill="currentColor" fillOpacity="0.8" />
                <path d="M20 10v4" strokeLinecap="round" />
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-8 md:h-8 flex items-end justify-around px-4 pb-1 bg-black" >
              <svg className="w-4 h-4 md:w-4 md:h-4 text-white/40 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>

              <svg className="w-4 h-4 md:w-4 md:h-4 text-white/40 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="13" r="9" />
                <path d="M12 7v6l4 2" />
                <path d="M9 2h6" />
              </svg>

              <svg className="w-4 h-4 md:w-4 md:h-4 text-white/40 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 2v6h-6" />
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M3 22v-6h6" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              </svg>

              <span className="text-[10px] md:text-[10px] font-bold text-white/40 tracking-wider mb-0.5">MENUu</span>
            </div>
          </div>

          <div className="mt-6 md:mt-8 flex items-center justify-center gap-8 md:gap-12">
            <button
              onClick={() => setFlashOn(!flashOn)}
              disabled={!torchSupported}
              className={`px-4 md:px-6 py-2 rounded-full transition-all ${
                flashOn
                  ? "bg-yellow-400 text-gray-900 shadow-lg"
                  : torchSupported
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              title={
                !torchSupported
                  ? "Flash not supported on this camera"
                  : flashOn
                  ? "Turn flash off"
                  : "Turn flash on"
              }
            >
              {flashOn ? (
                <Zap
                  className="w-4 h-4 md:w-5 md:h-5"
                  strokeWidth={2}
                  fill="currentColor"
                />
              ) : (
                <ZapOff className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
              )}
            </button>

            <button
              onClick={handleCapture}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-all active:scale-95 shadow-lg"
              title="Take photo"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-gray-900"></div>
            </button>

            <button
              onClick={switchCamera}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-all active:scale-95 shadow-md"
              title="Switch camera"
            >
              <RotateCcw
                className="w-5 h-5 md:w-6 md:h-6 text-gray-700"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default Camera;

//comment