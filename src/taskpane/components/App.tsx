import Header from "./Header";
import { makeStyles } from "@fluentui/react-components";
import Settings from "./Settings";
import VideoPlayer from "./VideoPlayer";
import VideoPlayerControls from "./VideoPlayerControls";

const useStyles = makeStyles({
  wrapper: {
    minHeight: "100vh",
  },
});

const App = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Header />
      <Settings />
      <VideoPlayerControls />
      <VideoPlayer />
    </div>
  );
};

export default App;
