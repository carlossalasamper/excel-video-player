import * as React from "react";
import { Image, tokens, makeStyles } from "@fluentui/react-components";

export interface HeaderProps {
  title: string;
  subtitle?: string;
  logoAlt: string;
  logo: string;
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    paddingTop: "100px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  title: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightRegular,
    fontColor: tokens.colorNeutralBackgroundStatic,
    marginBlockEnd: "16px",
  },
  subtitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightRegular,
    fontColor: tokens.colorNeutralBackgroundStatic,
  },
});

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, subtitle, logo, logoAlt } = props;
  const styles = useStyles();

  return (
    <section className={styles.wrapper}>
      <Image width="90" height="90" src={logo} alt={logoAlt} />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </section>
  );
};

export default Header;
