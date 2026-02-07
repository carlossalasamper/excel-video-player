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
    gap: "24px",
  },
  settingsItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "24px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
  },
});

const Settings: React.FC = () => {
  const styles = useStyles();
  const resolutionXId = useId("resolutionX");
  const resolutionYId = useId("resolutionY");
  const cellSizeId = useId("cellSize");
  const videoUrlId = useId("videoUrl");
  const resolution = useSettingsStore((state) => state.resolution);
  const setResolution = useSettingsStore((state) => state.setResolution);
  const cellSize = useSettingsStore((state) => state.cellSize);
  const setCellSize = useSettingsStore((state) => state.setCellSize);
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
        <p>Resolution</p>
        <div className={styles.inputRow}>
          <div>
            <label id={resolutionXId}>Width</label>
            <Input
              type="number"
              aria-labelledby={resolutionXId}
              value={resolution.width.toString()}
              onChange={onResolutionXChange}
            ></Input>
          </div>

          <div>
            <label id={resolutionYId}>Height</label>
            <Input
              type="number"
              aria-labelledby={resolutionYId}
              value={resolution.height.toString()}
              onChange={onResolutionYChange}
            ></Input>
          </div>
        </div>
      </div>

      <div className={styles.settingsItem}>
        <label id={cellSizeId}>Cell Size</label>
        <Input
          type="number"
          aria-labelledby={cellSizeId}
          value={cellSize.toString()}
          onChange={onCellSizeChange}
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
