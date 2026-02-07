import { useSettingsStore } from "@/presentation/stores/settingsStore";
import { useVideoPlayerStore } from "@/presentation/stores/videoPlayerStore";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useEffect, useRef } from "react";

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
  },
  outputLabel: {
    margin: "0",
  },
});

const VideoPlayer = () => {
  const styles = useStyles();
  const isPlaying = useVideoPlayerStore((state) => state.isPlaying);
  const videoUrl = useSettingsStore((state) => state.videoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startDrawing = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        if ("requestVideoFrameCallback" in video) {
          const render = () => {
            if (video.paused || video.ended) return;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            video.requestVideoFrameCallback(render);
          };

          video.requestVideoFrameCallback(render);
        }
      }
    }
  };

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
      }
    }
  }, [isPlaying, videoUrl]);

  return isPlaying ? (
    <div className={styles.wrapper}>
      <p className={styles.outputLabel}>Video Player</p>
      <video
        ref={videoRef}
        className={styles.video}
        playsInline
        controls={false}
        src={videoUrl}
      ></video>
      <p className={styles.outputLabel}>Canvas Output</p>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  ) : null;
};

export default VideoPlayer;
