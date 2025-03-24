"use client"
import React, { useRef, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/outline";

interface VideoPlayerProps {
  videoPath: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath, poster }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative w-[200px] h-[120px] bg-[#0c0c1d] rounded-lg overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-lg"
        poster={poster}
        onPause={handlePause} 
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handlePlay}
        >
          <button className="bg-black/50 rounded-full p-2">
            <PlayIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
