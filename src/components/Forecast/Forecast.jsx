import React, { useState } from "react";
import "./Forecast.css";
import ForecastItem from "./ForecastItem";

const Forecast = (props) => {
  const [forecast, setForecast] = useState({});
  const [forecastArray, setForecastArray] = useState([]);

  const forecastPressed = () => {
    // Forecast
    fetch(
      `${props.api.base}forecast?lat=${
        props.coords === undefined ? null : props.coords.lat
      }&lon=${
        props.coords === undefined ? null : props.coords.lon
      }&units=metric&appid=${props.api.key}`
    )
      .then((response) => response.json())
      .then((result) => {
        const newForecastArray = [];
        for (let i = 0; i <= 6; i++) {
          newForecastArray.push(result.list[i]);
        }
        setForecast(result);
        setForecastArray(newForecastArray);
        props.setTrigger(true);
        console.log(newForecastArray);
        console.log(result);
      });
  };

  return props.trigger ? (
    <div className="forecast">
      <div className="forecast-top-panel">
        <div className="forecast-title">Day Forecast</div>
        <div className="change-temp-units">
          <button className="change-units-btn">°C</button>
          <button className="change-units-btn">°F</button>
        </div>
      </div>
      <div className="forecast-wrapper">
        {forecastArray.length ? (
          forecastArray.map((item, index) => {
            return <ForecastItem key={index} item={item} />;
          })
        ) : (
          <p>There are no items</p>
        )}
      </div>
    </div>
  ) : (
    <div className="forecast-btn-wrapper">
      <button className="forecast-btn" onClick={forecastPressed}>
        Load Day Forecast
      </button>
    </div>
  );
};

export default Forecast;
