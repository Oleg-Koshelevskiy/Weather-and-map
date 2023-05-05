import { useReducer } from "react";
import languagePack from "./languagePack";
import Errors from "../UI/Errors";
import AppContext from "./app-context";

const initialContext = {
  lang:
    localStorage.getItem("lang") === "eng" ? languagePack[1] : languagePack[0],
  modal: false,
  info: false,
  currentCity: JSON.parse(localStorage.getItem("default")) || null,
  favList: null,
  coords: [],
  currentWeatherData: [],
  longWeatherData: [],
  showWeather: false,
  isLoading: false,
  defaultCoords: JSON.parse(localStorage.getItem("default")) || null,
};

const contextReducer = (state, action) => {
  if (action.type === "LANG") {
    if (state.lang[0] === "ukr") {
      localStorage.setItem("lang", "eng");
      action.lang = languagePack[1];
    }
    if (state.lang[0] === "eng") {
      localStorage.setItem("lang", "ukr");
      action.lang = languagePack[0];
    }
    console.log(action.lang);
    return { ...state, lang: action.lang };
  }

  if (action.type === "MODAL-ON") {
    action.modal = true;
    return { ...state, modal: action.modal };
  }

  if (action.type === "MODAL-OFF") {
    action.modal = false;
    return { ...state, modal: action.modal };
  }

  if (action.type === "INFO-ON") {
    action.info = true;
    return { ...state, info: action.info };
  }

  if (action.type === "INFO-OFF") {
    action.info = false;
    return { ...state, info: action.info };
  }

  if (action.type === "LOAD-ON") {
    action.isLoading = true;
    return { ...state, isLoading: action.isLoading };
  }

  if (action.type === "LOAD-OFF") {
    action.isLoading = false;
    return { ...state, isLoading: action.isLoading };
  }

  if (action.type === "GET-CURRENT") {
    return { ...state, currentCity: action.currentCity };
  }

  if (action.type === "COORDS") {
    return { ...state, coords: action.coords };
  }

  if (action.type === "CURRENT-WEATHER") {
    return { ...state, currentWeatherData: action.currentWeatherData };
  }

  if (action.type === "LONG-WEATHER") {
    return { ...state, longWeatherData: action.longWeatherData };
  }

  if (action.type === "FAV-LIST") {
    return { ...state, favList: action.favList };
  }
  if (action.type === "WEATHER-SHOW") {
    action.showWeather = true;
    return { ...state, showWeather: action.showWeather };
  }
  if (action.type === "WEATHER-HIDE") {
    action.showWeather = false;
    return { ...state, showWeather: action.showWeather };
  }
  if (action.type === "CHANGE-DEFAULT") {
    if (!state.currentCity) {
      alert(`${state.lang[1].unchosenCity}`);
      return state;
    }
    if (!state.defaultCoords) {
      const defaultCity = JSON.stringify(state.currentCity);
      localStorage.setItem("default", defaultCity);
      action.defaultCoords = state.currentCity;
      return {
        ...state,
        defaultCoords: action.defaultCoords,
      };
    }
    if (
      state.currentCity &&
      state.defaultCoords &&
      state.currentCity[0].name !== state.defaultCoords[0].name
    ) {
      const defaultCity = JSON.stringify(state.currentCity);
      localStorage.setItem("default", defaultCity);
      action.defaultCoords = state.currentCity;
      return {
        ...state,
        defaultCoords: action.defaultCoords,
      };
    }
    if (state.currentCity[0].name === state.defaultCoords[0].name) {
      localStorage.removeItem("default");
      return {
        ...state,
        defaultCoords: null,
      };
    }
  }
};

const AppContextProvider = (props) => {
  const [contextState, dispatchContext] = useReducer(
    contextReducer,
    initialContext
  );

  const languageHandler = () => {
    dispatchContext({ type: "LANG" });
  };

  const getStoredCities = () => {
    const storedCities = JSON.parse(localStorage.getItem("cities"));
    if (!storedCities) {
      dispatchContext({ type: "FAV-LIST", favList: [] });
    }
    dispatchContext({ type: "FAV-LIST", favList: storedCities });
  };

  const currentCityHandler = (lat, lon, name) => {
    dispatchContext({
      type: "GET-CURRENT",
      currentCity: [{ id: `${lat}${lon}`, coords: [lat, lon], name: name }],
    });
  };

  const modalOnHandler = () => {
    getStoredCities();
    dispatchContext({ type: "MODAL-ON" });
  };
  const modalOffHandler = () => {
    dispatchContext({ type: "MODAL-OFF" });
  };

  const infoOnHandler = () => {
    dispatchContext({ type: "INFO-ON" });
  };
  const infoOffHandler = () => {
    dispatchContext({ type: "INFO-OFF" });
  };

  const addFavCityHandler = () => {
    if (!contextState.currentCity) return alert("Оберіть місто!");

    if (!contextState.favList) {
      const storedCities = JSON.stringify(contextState.currentCity);
      localStorage.setItem("cities", storedCities);
      getStoredCities();
    }

    const match = contextState.favList.find(
      (item) => item.name === contextState.currentCity.name
    );
    if (match) {
      return;
    }
    const storedCities = JSON.stringify([
      contextState.currentCity[0],
      ...contextState.favList,
    ]);
    localStorage.setItem("cities", storedCities);

    getStoredCities();
  };

  const removeFavCityHandler = (id) => {
    const favCityIndex = contextState.favList.findIndex(
      (item) => item.id === id
    );
    const favCityItem = contextState.favList[favCityIndex];
    const updatedFavCities = contextState.favList.filter(
      (item) => item.id !== favCityItem.id
    );
    const storedCities = JSON.stringify(updatedFavCities);
    localStorage.setItem("cities", storedCities);
    getStoredCities();
  };

  const removeFavCities = () => {
    localStorage.clear();
    dispatchContext({ type: "FAV-LIST", favList: [] });
  };

  const getCityCoords = (cityName) => {
    dispatchContext({ type: "LOAD-ON" });

    fetch(`http://localhost:9999/.netlify/functions/location/?city=${cityName}`)
      .then((response1) => response1.json())
      .then((data) => {
        let cityLocalName;
        if (contextState.lang[0] === "ukr") {
          cityLocalName = data[0].local_names.uk;
        } else {
          cityLocalName = data[0].local_names.en;
        }
        let nativeName;
        fetch(`https://restcountries.com/v3.1/alpha/${data[0].country}`)
          .then((response2) => response2.json())
          .then((data2) => {
            if (contextState.lang[0] === "ukr") {
              nativeName = Object.entries(data2[0].name.nativeName)[0][1]
                .common;
            } else {
              nativeName = data2[0].name.common;
            }

            weatherHandler(data[0].lat, data[0].lon);

            currentCityHandler(
              data[0].lat,
              data[0].lon,
              `${nativeName}, ${cityLocalName}`
            );
            dispatchContext({ type: "LOAD-OFF" });
          })
          .catch((error) => {
            console.log(error);
            currentCityHandler(
              null,
              null,
              <Errors message={contextState.lang[1].errorCountry}></Errors>
            );
            dispatchContext({ type: "LOAD-OFF" });
          });
      })
      .catch((error) => {
        console.log(error);
        currentCityHandler(
          null,
          null,
          <Errors message={contextState.lang[1].errorCity}></Errors>
        );
        dispatchContext({ type: "LOAD-OFF" });
      });
  };

  const getCurrentCoords = () => {
    dispatchContext({ type: "LOAD-ON" });
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      let cityLocalName;
      if (contextState.lang[0] === "ukr") {
        cityLocalName = "default";
      } else {
        cityLocalName = "en";
      }

      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${cityLocalName}`
      )
        .then((res) => res.json())
        .then((data) => {
          weatherHandler(lat, lon);
          currentCityHandler(lat, lon, `${data.countryName}, ${data.city}`);
          dispatchContext({ type: "LOAD-OFF" });
        })
        .catch((error) => {
          console.log(error.message);
          dispatchContext({
            type: "GET-CURRENT",
            lat: null,
            lon: null,
            name: <Errors message={contextState.lang[1].errorCity}></Errors>,
          });
          dispatchContext({ type: "LOAD-OFF" });
        });
    }

    function error() {
      currentCityHandler(
        null,
        null,
        <Errors message={contextState.lang[1].errorCity}></Errors>
      );
      dispatchContext({ type: "LOAD-OFF" });
    }

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const weatherHandler = (lat, lon) => {
    dispatchContext({ type: "LOAD-ON" });
    dispatchContext({ type: "COORDS", coords: [lat, lon] });

    const lang = contextState.lang[1].fetchLang;

    fetch(`http://localhost:8000/weather?lat=${lat}&lon=${lon}&lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        dispatchContext({
          type: "CURRENT-WEATHER",
          currentWeatherData: data,
        });
        dispatchContext({ type: "LOAD-OFF" });
      })
      .catch((error) => {
        console.log(error);
        dispatchContext({ type: "LOAD-OFF" });
      });

    fetch(`http://localhost:8000/forecast?lat=${lat}&lon=${lon}&lang=${lang}`)
      .then((response) => response.json())
      .then((data) => {
        dispatchContext({
          type: "LONG-WEATHER",
          longWeatherData: data.list,
        });
        dispatchContext({ type: "WEATHER-SHOW" });
        dispatchContext({ type: "LOAD-OFF" });
      })
      .catch((error) => {
        console.log(error);
        dispatchContext({ type: "LOAD-OFF" });
      });
  };

  const LoadingOnHandler = () => {
    dispatchContext({ type: "LOAD-ON" });
  };

  const LoadingOffHandler = () => {
    dispatchContext({ type: "LOAD-OFF" });
  };

  const changeDefaultCoordsHandler = () => {
    dispatchContext({ type: "CHANGE-DEFAULT" });
  };

  const appContext = {
    languagePack: contextState.lang,
    modalState: contextState.modal,
    infoState: contextState.info,
    currentCity: contextState.currentCity,
    favCities: contextState.favList,
    coords: contextState.coords,
    defaultCoords: contextState.defaultCoords,
    currentWeatherData: contextState.currentWeatherData,
    longWeatherData: contextState.longWeatherData,
    showWeather: contextState.showWeather,
    isLoading: contextState.isLoading,
    onChangeLanguage: languageHandler,
    modalOn: modalOnHandler,
    modalOff: modalOffHandler,
    infoOn: infoOnHandler,
    infoOff: infoOffHandler,
    addCurrentCity: currentCityHandler,
    addFavCity: addFavCityHandler,
    removeFavCity: removeFavCityHandler,
    clearAll: removeFavCities,
    useCoords: weatherHandler,
    loaderOn: LoadingOnHandler,
    loaderOff: LoadingOffHandler,
    getCityCoords: getCityCoords,
    getCurrentCoords: getCurrentCoords,
    changeDefaultCoords: changeDefaultCoordsHandler,
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
