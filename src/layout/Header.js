import { useContext } from "react";
import styles from "./Header.module.css";
import AppContext from "../store/app-context";
import favicon from "../images/favourite.png";
import Card from "../UI/Card";

const Header = () => {
  const context = useContext(AppContext);

  const ctx = context.languagePack[1];

  const background = context.languagePack[1].background;

  return (
    <Card>
      <div className={styles.header}>
        <h1 className={styles.text}>{ctx.header}</h1>
        <button
          onClick={context.onChangeLanguage}
          className={`${styles.button} ${styles[background]}`}
        >
          {ctx.name}
        </button>
        <button onClick={context.modalOn} className={styles.favourite}>
          <img src={favicon} alt="favourite" />
        </button>
      </div>
    </Card>
  );
};

export default Header;
