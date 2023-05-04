import { useContext } from "react";
import Modal from "../UI/Modal";
import AppContext from "../store/app-context";
import styles from "./FavouriteList.module.css";

const FavouriteList = () => {
  const context = useContext(AppContext);

  const ctx = context.languagePack[1];

  let cities;

  const removeFavCityHandler = (id) => {
    context.removeFavCity(id);
  };

  const citiesArray = context.favCities;
  if (!citiesArray) {
    cities = ctx.errorMsg;
  } else {
    cities = citiesArray.map((city) => {
      const getCityWeather = (lat, lon, name) => {
        context.useCoords(lat, lon);
        context.addCurrentCity(lat, lon, name);
      };

      const shortName = city.name.slice(city.name.indexOf(",") + 2);

      let cityStyle;
      if (
        context.defaultCoords &&
        context.defaultCoords[0].name === city.name
      ) {
        cityStyle = `${styles.btnCity} ${styles.useDefault}`;
      } else {
        cityStyle = styles.btnCity;
      }

      return (
        <div className={styles.item} key={city.id}>
          <button
            className={cityStyle}
            onClick={getCityWeather.bind(
              null,
              city.coords[0],
              city.coords[1],
              city.name
            )}
          >
            {shortName}
          </button>
          <button onClick={removeFavCityHandler.bind(null, city.id)}>
            {ctx.dellBtn}
          </button>
        </div>
      );
    });
  }

  return (
    <Modal>
      <div className={styles.main}>
        <h2 className={styles.header}>{ctx.chosen}</h2>
        <div>
          <button
            className={styles.btnClose}
            onClick={context.modalOff}
          ></button>
        </div>
      </div>
      <div className={styles.group}>
        <button onClick={context.addFavCity} className={styles.popupAddBtn}>
          {ctx.addCoords}
        </button>
      </div>
      <div>{cities}</div>
      <button onClick={context.clearAll} className={styles.popupDelBtn}>
        {ctx.clearAll}
      </button>
    </Modal>
  );
};

export default FavouriteList;
