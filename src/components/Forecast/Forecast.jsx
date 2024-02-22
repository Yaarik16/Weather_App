import React, { useState } from "react";
import "./Forecast.css";
import ForecastItem from "./ForecastItem";

const Forecast = (props) => {
  const [forecast, setForecast] = useState({});
  const [forecastArray, setForecastArray] = useState([]);
  const [temp, setTemp] = useState(false);

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
        for (let i = 6; i <= 38; i += 8) {
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
        <div className="forecast-title">Week Forecast</div>
        <div className="change-temp-units">
          <button onClick={() => setTemp(!temp)} className="change-units-btn">
            {temp ? "°C" : "°F"}
          </button>
        </div>
      </div>
      <div className="forecast-wrapper">
        {forecastArray.length ? (
          forecastArray.map((item, index) => {
            return <ForecastItem key={index} switchTemp={temp} item={item} />;
          })
        ) : (
          <p>There are no items</p>
        )}
      </div>
      <div className="credentials">
        <p>Designed and developed by:</p>
        <a
          className="credentials-name"
          href="https://www.linkedin.com/in/yaroslav-dimbrovskyi-00378927a/"
          target="_blank"
          rel="noreferrer"
        >
          Yaroslav Dimbrovskyi
        </a>
      </div>
    </div>
  ) : (
    <div className="forecast-btn-wrapper">
      <button className="forecast-btn" onClick={forecastPressed}>
        Load Week Forecast
      </button>
    </div>
  );
};

export default Forecast;
