import { useState, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "./LeafletMap.css";
import AppContext from "../store/app-context";
import Errors from "../UI/Errors";

const LeafletMap = () => {
  const [clickedCoords, setClickedCoords] = useState(null);
  const context = useContext(AppContext);
  const ctx = context.languagePack[1];

  const lat = context.coords[0];
  const lon = context.coords[1];

  const Recenter = () => {
    const map = useMap();

    if (!clickedCoords) {
      map.setView([lat, lon]);
    } else {
      map.setView(clickedCoords);
    }

    return (
      <Marker position={clickedCoords ? clickedCoords : [lat, lon]}>
        <Popup>
          {clickedCoords ? (
            <button onClick={getClickedCoordsData}>{ctx.btnShow}</button>
          ) : (
            context.currentCity[0].name
          )}
        </Popup>
      </Marker>
    );
  };

  const CoordsHandler = () => {
    const map = useMap();
    useMapEvents({
      click: (e) => {
        setClickedCoords([e.latlng.lat, e.latlng.lng]);
      },
    });

    if (!clickedCoords) return;

    map.setView(clickedCoords);

    return null;
  };

  const getClickedCoordsData = (e) => {
    e.preventDefault();
    context.loaderOn();
    const clickedLat = clickedCoords[0];
    const clickedLon = clickedCoords[1];
    let language;
    if (context.languagePack[0] === "ukr") language = "default";
    if (context.languagePack[0] === "uk") language = "eng";
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${clickedLat}&longitude=${clickedLon}&localityLanguage=${language}`
    )
      .then((res) => res.json())
      .then((data) => {
        context.useCoords(clickedLat, clickedLon);
        context.addCurrentCity(
          clickedLat,
          clickedLon,
          `${data.countryName}, ${data.city}`
        );
        setClickedCoords(null);
        context.loaderOff();
      })
      .catch((error) => {
        console.log(error);
        context.addCurrentCity(
          null,
          null,
          <Errors message={ctx.errorMap}></Errors>
        );
        context.loaderOff();
      });
  };

  return (
    <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CoordsHandler />
      <Recenter />
    </MapContainer>
  );
};

export default LeafletMap;
