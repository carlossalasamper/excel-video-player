import * as React from "react";
import { useId } from "@fluentui/react-utilities";
import {
  tokens,
  makeStyles,
  Input,
  InputOnChangeData,
  Button,
} from "@fluentui/react-components";
import { useVideoPlayerStore } from "@/presentation/stores/videoPlayerStore";
import { useSettingsStore } from "@/presentation/stores/settingsStore";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  settingsItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
  },
  resolutionInput: {
    maxWidth: "80px",
  },
});

const Settings: React.FC = () => {
  const styles = useStyles();
  const cellSizeId = useId("cellSize");
  const fpsId = useId("fps");
  const videoUrlId = useId("videoUrl");
  const resolution = useSettingsStore((state) => state.resolution);
  const setResolution = useSettingsStore((state) => state.setResolution);
  const cellSize = useSettingsStore((state) => state.cellSize);
  const setCellSize = useSettingsStore((state) => state.setCellSize);
  const fps = useSettingsStore((state) => state.fps);
  const setFps = useSettingsStore((state) => state.setFps);
  const videoUrl = useSettingsStore((state) => state.videoUrl);
  const setVideoUrl = useSettingsStore((state) => state.setVideoUrl);
  const isPlaying = useVideoPlayerStore((state) => state.isPlaying);
  const setIsPlaying = useVideoPlayerStore((state) => state.setIsPlaying);
  const onResolutionXChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setResolution({ width: parseInt(data.value), height: resolution.height });
  };
  const onResolutionYChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setResolution({ width: resolution.width, height: parseInt(data.value) });
  };
  const onCellSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setCellSize(parseInt(data.value));
  };
  const onFpsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setFps(parseInt(data.value));
  };
  const onVideoUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setVideoUrl(data.value);
  };
  const onPlayButtonClick = () => {
    setIsPlaying(true);
  };
  const onPauseButtonClick = () => {
    setIsPlaying(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.settingsItem}>
        <label>Resolution</label>
        <div className={styles.inputRow}>
          <Input
            type="number"
            value={resolution.width.toString()}
            onChange={onResolutionXChange}
            className={styles.resolutionInput}
            min={1}
          ></Input>
          x
          <Input
            type="number"
            value={resolution.height.toString()}
            onChange={onResolutionYChange}
            className={styles.resolutionInput}
            min={1}
          ></Input>
        </div>
      </div>

      <div className={styles.settingsItem}>
        <label id={cellSizeId}>Cell Size</label>
        <Input
          type="number"
          aria-labelledby={cellSizeId}
          value={cellSize.toString()}
          onChange={onCellSizeChange}
          min={1}
        ></Input>
      </div>

      <div className={styles.settingsItem}>
        <label id={fpsId}>FPS</label>
        <Input
          type="number"
          aria-labelledby={fpsId}
          value={fps.toString()}
          onChange={onFpsChange}
          min={1}
        ></Input>
      </div>

      <div className={styles.settingsItem}>
        <label id={videoUrlId}>Video URL</label>
        <Input
          type="text"
          aria-labelledby={videoUrlId}
          value={videoUrl}
          onChange={onVideoUrlChange}
        ></Input>
      </div>

      {!isPlaying ? (
        <Button appearance="primary" onClick={onPlayButtonClick}>
          Play
        </Button>
      ) : (
        <Button appearance="primary" onClick={onPauseButtonClick}>
          Pause
        </Button>
      )}
    </div>
  );
};

export default Settings;
