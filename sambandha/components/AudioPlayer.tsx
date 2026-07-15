import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const value = Number(e.target.value);
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    setProgress(value);
  };

  return (
    <div className="w-full flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg">
      <button
        onClick={togglePlay}
        className="p-2 text-gray-600"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <input
        type="range"
        value={progress}
        onChange={handleSeek}
        className="w-full cursor-pointer rounded-lg h-[5px]"
      />

      <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} />
    </div>
  );
}

// "use client";

// import { useRef, useState } from "react";
// import { Play, Pause } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface AudioPlayerProps {
//   src: string;
// }

// export default function AudioPlayer({ src }: AudioPlayerProps) {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const togglePlay = () => {
//     if (!audioRef.current) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleTimeUpdate = () => {
//     if (!audioRef.current) return;
//     const percentage =
//       (audioRef.current.currentTime / audioRef.current.duration) * 100;
//     setProgress(percentage);
//   };

//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!audioRef.current) return;
//     const value = Number(e.target.value);
//     audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
//     setProgress(value);
//   };

//   return (
//     <div className="w-full flex items-center gap-3 m-2">
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={togglePlay}
//         className="h-6 w-8 rounded-full bg-black text-white hover:bg-gray-800"
//       >
//         {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//       </Button>

//       <input
//         type="range"
//         value={progress}
//         onChange={handleSeek}
//         className="w-full h-[5px] accent-black cursor-pointer rounded-lg mr-4"
//       />

//       <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} />
//     </div>
//   );
// }
