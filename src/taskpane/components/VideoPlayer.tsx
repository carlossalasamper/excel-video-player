import { useSettingsStore } from "@/stores/settingsStore";
import { useVideoPlayerStore } from "@/stores/videoPlayerStore";
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
    backgroundColor: "black",
  },
  outputLabel: {
    margin: "0",
  },
  errorWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
  },
  errorCount: {
    color: tokens.colorPaletteRedForeground1,
    fontWeight: "bold",
    margin: 0,
  },
  errorMessage: {
    color: tokens.colorPaletteRedForeground1,
    backgroundColor: tokens.colorPaletteRedBackground1,
    padding: "8px",
    margin: 0,
  },
});

const VideoPlayer = () => {
  const styles = useStyles();
  const isPlaying = useVideoPlayerStore((state) => state.isPlaying);
  const time = useVideoPlayerStore((state) => state.time);
  const setTime = useVideoPlayerStore((state) => state.setTime);
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
  const errors = useVideoPlayerStore((state) => state.errors);
  const lastError = useVideoPlayerStore((state) => state.getLastError());
  const startDrawing = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
        alpha: false,
      });

      if (ctx) {
        const frameInterval = 1000 / fps;
        const drawFrame = () => {
          if (video.paused || video.ended) {
            stopDrawing();
          } else {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            setCurrentFrameData(
              ctx.getImageData(0, 0, canvas.width, canvas.height)
            );
          }
        };

        ctx.imageSmoothingEnabled = false;

        canvas.width = resolution.width;
        canvas.height = resolution.height;

        stopDrawing();

        drawFrame();

        intervalRef.current = window.setInterval(drawFrame, frameInterval);
      }
    }
  }, [fps, setCurrentFrameData, stopDrawing, resolution]);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (isPlaying && video.paused) {
        video.currentTime = time;
        video
          .play()
          .then(() => startDrawing())
          .catch((err) => console.warn("Playback blocked:", err));
      } else {
        video.pause();
        setTime(video.currentTime);
        stopDrawing();
      }
    }

    return stopDrawing;
  }, [isPlaying, videoUrl, fps, startDrawing, stopDrawing, time, setTime]);

  return (
    <div className={styles.wrapper}>
      {errors.length > 1 && (
        <div className={styles.errorWrapper}>
          {lastError && (
            <p className={styles.errorMessage}>{lastError.message}</p>
          )}
          <p className={styles.errorCount}>{errors.length} errors occurred.</p>
        </div>
      )}

      <p className={styles.outputLabel}>Original Video</p>
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
  );
};

export default VideoPlayer;
