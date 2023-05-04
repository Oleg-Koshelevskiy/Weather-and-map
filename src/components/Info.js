import { useContext } from "react";
import AppContext from "../store/app-context";
import Modal from "../UI/Modal";
import favicon from "../images/favourite.png";
import lang from "../images/ukr.png";
import gps from "../images/gps.png";
import inputUkr from "../images/inputUkr.png";
import marker from "../images/map-marker.png";
import styles from "./Info.module.css";

const Info = () => {
  const context = useContext(AppContext);
  const ctx = context.languagePack[1];

  return (
    <Modal>
      <div className={styles.container}>
        <button className={styles.btnClose} onClick={context.infoOff}></button>
      </div>
      <h2 className={styles.header}>{ctx.infoHeader}</h2>
      <ul className={styles.list}>
        <li>
          <span>
            <img src={lang} alt="language" />
          </span>
          {ctx.infoLi1}
        </li>
        <li>
          <span>
            <img src={favicon} alt="favourite" />
          </span>
          {ctx.infoLi2}
        </li>
        <li>
          <span>
            <img src={gps} alt="gps" />
          </span>
          {ctx.infoLi3}
        </li>
        <li>
          <span>
            <img
              className={styles.input}
              src={inputUkr}
              alt="input screenshot"
            />
          </span>
          {ctx.infoLi4}
        </li>
        <li>
          {ctx.infoLi5}
          <span>
            <img className={styles.marker} src={marker} alt="map-marker" />
          </span>
        </li>
        <li>
          {ctx.infoLi6}          
        </li>
      </ul>
    </Modal>
  );
};

export default Info;
