import { useRef, useContext } from "react";
import Button from "../UI/Button";
import styles from "./InputCity.module.css";
import AppContext from "../store/app-context";

const InputCity = (props) => {
  const context = useContext(AppContext);

  const inputCity = useRef();

  const ctx = context.languagePack[1];

  let forecastType;

  let cityHeader;

  let cityHeaderStyle;

  const defaultCityHandler = (event) => {
    if (event.detail === 2) {
      context.changeDefaultCoords();
    }
  };

  if (
    context.defaultCoords &&
    context.currentCity &&
    context.defaultCoords[0].name === context.currentCity[0].name
  ) {
    cityHeaderStyle = `${styles.city} ${styles.useDefault}`;
  } else {
    cityHeaderStyle = `${styles.city} ${styles.clearDefault}`;
  }

  if (context.currentCity) {
    cityHeader = context.currentCity[0].name;
  } else {
    cityHeader = ctx.unchosenCity;
  }

  if (props.currentType) {
    forecastType = `${ctx.btn5Days}`;
  } else {
    forecastType = `${ctx.btnCurrent}`;
  }

  const useCityCoords = (e) => {
    const cityName = inputCity.current.value;
    e.preventDefault();
    context.getCityCoords(cityName);
    inputCity.current.value = "";
  };

  return (
    <div className={styles.component}>
      <form
        disabled={context.isLoading}
        onSubmit={useCityCoords}
        className={styles.form}
      >
        <button
          className={styles.gps}
          type="button"
          onClick={context.getCurrentCoords}
          disabled={context.isLoading}
        />
        <input
          className={styles.input}
          type="text"
          placeholder={ctx.placeholder}
          ref={inputCity}
          disabled={context.isLoading}
        />
        <Button type="submit">{ctx.btnShow}</Button>
      </form>
      <Button type="submit" onClick={props.changeForecastType}>
        {forecastType}
      </Button>
      <br />
      <h3 onClick={defaultCityHandler} className={cityHeaderStyle}>
        {cityHeader}
      </h3>
    </div>
  );
};

export default InputCity;
