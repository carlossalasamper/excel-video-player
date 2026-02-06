import * as React from "react";
import { useId } from "@fluentui/react-utilities";
import {
  RadioGroup,
  tokens,
  makeStyles,
  Radio,
  RadioGroupOnChangeData,
} from "@fluentui/react-components";
import { useSettingsStore } from "../../stores/settingsStore";

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
});

const Settings: React.FC = () => {
  const styles = useStyles();
  const factorialModeId = useId("factorial-mode");
  const factorialMode = useSettingsStore((state) => state.factorialMode);
  const setFactorialMode = useSettingsStore((state) => state.setFactorialMode);
  const onFactorialModeChange = (
    event: React.FormEvent<HTMLDivElement>,
    data: RadioGroupOnChangeData
  ) => {
    setFactorialMode(data.value as "row" | "column");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.settingsItem}>
        <label id={factorialModeId}>FACTORIALROW Mode</label>
        <RadioGroup
          aria-labelledby={factorialModeId}
          value={factorialMode}
          onChange={onFactorialModeChange}
        >
          <Radio value="row" label="Row" required />
          <Radio value="column" label="Column" required />
        </RadioGroup>
      </div>
    </div>
  );
};

export default Settings;
