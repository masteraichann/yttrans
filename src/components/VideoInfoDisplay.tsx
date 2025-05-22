
import React from 'react';

interface VideoInfoDisplayProps {
  videoId: string;
}

const VideoInfoDisplay: React.FC<VideoInfoDisplayProps> = ({ videoId }) => {
  if (!videoId) return null;
  
  return (
    <div className="relative pb-[56.25%] h-0 mt-6 mb-8 rounded-lg overflow-hidden shadow-lg">
      <iframe 
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoInfoDisplay;
