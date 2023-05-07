import { useContext } from "react";
import AppContext from "../store/app-context";
import LongWeatherItem from "./LongWeatherItem";
import CityNotChosen from "./CityNotChosen";
import styles from "./LongWeatherDashboard.module.css";
import seasonStyles from "./Seasons.module.css";

const LongWeatherDashboard = (props) => {
  const context = useContext(AppContext);
  const forecast = context.longWeatherData;

  if (!context.showWeather) {
    return <CityNotChosen />;
  }

  const items = forecast.map((item) => (
    <LongWeatherItem item={item} key={Math.random()} />
  ));

  return (
    <div className={`${styles.dashboard} ${seasonStyles[props.season]}`}>
      {items}
    </div>
  );
};

export default LongWeatherDashboard;
