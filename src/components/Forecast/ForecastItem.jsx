import React from "react";
import sunicon from "../../icons/night.svg";
import "./Forecast.css";

const ForecastItem = (props) => {
  return (
    <div className="forecast-item">
      <div className="forecast-item-day">{props.item.dt_txt}</div>
      <img
        className="forecast-item-icon"
        alt="weather-icon"
        src={sunicon}
      ></img>
      <div className="forecast-item-temp">
        {props.item.main.temp}°C/<span>{props.item.main.feels_like}°C</span>
      </div>
    </div>
  );
};

export default ForecastItem;
