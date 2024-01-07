import {useEffect, useRef} from 'react';

type VideoPlayerProps = {
  src: string;
  poster: string;
  muted: boolean;
  isPlaying: boolean;
}

export function VideoPlayer({src, poster, muted, isPlaying}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    let isMounted = true;
    if (isMounted && videoRef.current !== null) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.load();
      }
    }

    return () => {
      isMounted = false;
    };
  }, [isPlaying, videoRef]);

  return (
    <video
      width="280"
      height="175"
      ref={videoRef}
      src={src}
      poster={poster}
      muted={muted}
    />
  );
}
