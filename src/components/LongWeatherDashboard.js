import { useContext } from "react";
import AppContext from "../store/app-context";
import LongWeatherItem from "./LongWeatherItem";
import CityNotChosen from "./CityNotChosen";
import styles from "./LongWeatherDashboard.module.css";
import seasonStyles from "./Seasons.module.css";

const LongWeatherDashboard = (props) => {
  const context = useContext(AppContext);

  if (!context.showWeather) {
    return <CityNotChosen />;
  }

  const item = context.longWeatherData.map((item) => (
    <LongWeatherItem item={item} key={Math.random()} />
  ));

  return (
    <div className={`${styles.dashboard} ${seasonStyles[props.season]}`}>
      {item}
    </div>
  );
};

export default LongWeatherDashboard;
