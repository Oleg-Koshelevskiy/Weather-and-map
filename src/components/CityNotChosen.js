import { useContext } from "react";
import AppContext from "../store/app-context";
import Card from "../UI/Card";
import styles from "./CityNotChosen.module.css";

const CityNotChosen = () => {
  const context = useContext(AppContext);
  const ctx = context.languagePack[1];

  return (
    <Card>
      <h2 className={styles.text}>{ctx.locationPlaceholder}</h2>
    </Card>
  );
};

export default CityNotChosen;
