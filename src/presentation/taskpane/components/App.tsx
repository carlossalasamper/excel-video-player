import Header from "./Header";
import { makeStyles } from "@fluentui/react-components";
import Settings from "./Settings";
import VideoPlayer from "./VideoPlayer";

const useStyles = makeStyles({
  wrapper: {
    minHeight: "100vh",
  },
});

const App = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Header
        title="Excel Video Player"
        subtitle="Use a sheet as monitor"
        logo="assets/logo-filled.png"
        logoAlt="Excel Video Player"
      />
      <Settings />

      <VideoPlayer />
    </div>
  );
};

export default App;
