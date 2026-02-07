import { useSettingsStore } from "@/presentation/stores/settingsStore";
import { useVideoPlayerStore } from "@/presentation/stores/videoPlayerStore";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useCallback, useEffect, useRef } from "react";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "24px",
  },
  video: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    width: "100%",
    height: "auto",
  },
  canvas: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    width: "100%",
    height: "auto",
    imageRendering: "pixelated",
  },
  outputLabel: {
    margin: "0",
  },
});

const VideoPlayer = () => {
  const styles = useStyles();
  const isPlaying = useVideoPlayerStore((state) => state.isPlaying);
  const resolution = useSettingsStore((state) => state.resolution);
  const fps = useSettingsStore((state) => state.fps);
  const setCurrentFrameData = useVideoPlayerStore(
    (state) => state.setCurrentFrameData
  );
  const videoUrl = useSettingsStore((state) => state.videoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number | null>(null);
  const stopDrawing = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  const startDrawing = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
        alpha: false,
      });

      if (ctx) {
        ctx.imageSmoothingEnabled = false;

        canvas.width = resolution.width;
        canvas.height = resolution.height;

        stopDrawing();

        const frameInterval = 1000 / fps;
        intervalRef.current = window.setInterval(() => {
          if (video.paused || video.ended) {
            stopDrawing();
            return;
          }
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setCurrentFrameData(
            ctx.getImageData(0, 0, canvas.width, canvas.height)
          );
        }, frameInterval);
      }
    }
  }, [fps, setCurrentFrameData, stopDrawing, resolution]);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (isPlaying && videoUrl) {
        video.src = videoUrl;
        video
          .play()
          .then(startDrawing)
          .catch((err) => console.warn("Playback blocked:", err));
      } else {
        video.pause();
        stopDrawing();
      }
    }

    return stopDrawing;
  }, [isPlaying, videoUrl, fps, startDrawing, stopDrawing]);

  return isPlaying ? (
    <div className={styles.wrapper}>
      <p className={styles.outputLabel}>Video Player</p>
      <video
        ref={videoRef}
        className={styles.video}
        playsInline
        controls={false}
        crossOrigin="anonymous"
        src={videoUrl}
      ></video>
      <p className={styles.outputLabel}>Canvas Output</p>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  ) : null;
};

export default VideoPlayer;
