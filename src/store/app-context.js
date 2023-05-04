import { createContext } from "react";

const AppContext = createContext({
  languagePack: [],
  modalState: false,
  infoState: false,
  currentCity: [],
  favCities: [],
  coords: [],
  cityStyle: "",
  defaultCoords: null,
  currentWeatherData: [],
  longWeatherData: [],
  showWeather: false,
  isLoading: false,
  onChangeLanguage: () => {},
  modalOn: () => {},
  modalOff: () => {},
  infoOn: () => {},
  infoOff: () => {},
  addCurrentCity: () => {},
  addFavCity: () => {},
  removeFavCity: () => {},
  clearAll: () => {},
  useCoords: () => {},
  loaderOn: () => {},
  loaderOff: () => {},
  getCityCoords: () => {},
  getCurrentCoords: () => {},
  changeDefaultCoords: () => {},
});

export default AppContext;
