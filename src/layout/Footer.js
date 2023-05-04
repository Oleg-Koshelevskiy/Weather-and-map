import { useContext } from "react";
import AppContext from "../store/app-context";
import Card from "../UI/Card";
import styles from "./Footer.module.css";

const Footer = () => {
  const context = useContext(AppContext);

  return (
    <Card>
      <div className={styles.footer}>
        <div className={styles.copyright}>
          Web Magic Crafter<sup>&copy;</sup>
        </div>
        <button onClick={context.infoOn} className={styles.btnInfo}></button>
        <a
          className={styles.ref}
          href="https://www.linkedin.com/in/oleg-koshelevskyi-74031443/"
        >
          <img
            className={styles.img}
            src={`/icons/Linkedin.png`}
            alt="Linkedin"
          />
        </a>
      </div>
    </Card>
  );
};

export default Footer;
