import * as React from "react";
import { makeStyles, Button, tokens } from "@fluentui/react-components";
import { useVideoPlayerStore } from "@/stores/videoPlayerStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { Pause20Filled, Play20Filled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "12px 24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  time: {
    textAlign: "center",
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px 24px",
  },
});

const VideoPlayerControls: React.FC = () => {
  const styles = useStyles();
  const videoUrl = useSettingsStore((state) => state.videoUrl);
  const isPlaying = useVideoPlayerStore((state) => state.isPlaying);
  const setIsPlaying = useVideoPlayerStore((state) => state.setIsPlaying);
  const time = useVideoPlayerStore((state) => state.time);
  const onPlayButtonClick = () => {
    setIsPlaying(true);
  };
  const onPauseButtonClick = () => {
    setIsPlaying(false);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.time}>{time.toFixed(2)}s</span>
      <div className={styles.actions}>
        <Button
          appearance="primary"
          onClick={onPlayButtonClick}
          disabled={isPlaying || !videoUrl}
        >
          <Play20Filled />
        </Button>
        <Button
          appearance="secondary"
          onClick={onPauseButtonClick}
          disabled={!isPlaying}
        >
          <Pause20Filled />
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayerControls;
