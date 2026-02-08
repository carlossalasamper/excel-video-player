import * as React from "react";
import { Image, tokens, makeStyles } from "@fluentui/react-components";
import { Star16Filled } from "@fluentui/react-icons";

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "24px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  banner: {
    width: "100%",
    objectFit: "cover",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightRegular,
    fontColor: tokens.colorNeutralBackgroundStatic,
    margin: 0,
    marginBottom: "12px",
  },
  actions: {
    display: "flex",
    gap: "12px",
  },
  action: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
});

const Header = () => {
  const styles = useStyles();

  return (
    <section className={styles.wrapper}>
      <Image
        className={styles.banner}
        src={"assets/images/banner.webp"}
        alt="Excel Video Player Banner"
      />
      <h2 className={styles.subtitle}>
        📺 Add-in to visualize videos in Excel sheets.
      </h2>
      <div className={styles.actions}>
        <a
          className={styles.action}
          href="https://github.com/carlossalasamper/excel-video-player"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub <Star16Filled />
        </a>
      </div>
    </section>
  );
};

export default Header;
