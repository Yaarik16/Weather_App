import React from "react";
import "./Forecast.css";

const ForecastItem = (props) => {
  const dateString = props.item.dt_txt;
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  let celsiusDayTemp = props.item.main.temp;
  let celsiusDayFeelsLikeTemp = props.item.main.feels_like;
  let farenheitDayTemp = props.item.main.temp * 1.8 + 32;
  let farenheitDayFeelsLikeTemp = props.item.main.feels_like * 1.8 + 32;

  return (
    <div className="forecast-item">
      <div className="forecast-item-day">{formattedDate}</div>
      <img
        className="forecast-item-icon"
        alt="weather-icon"
        src={`../../icons/${props.item.weather[0].icon}.png`}
        draggable="false"
      ></img>
      <div className="forecast-item-temp">
        {props.switchTemp
          ? Math.floor(farenheitDayTemp) +
            "°F" +
            " " +
            "/" +
            " " +
            Math.floor(farenheitDayFeelsLikeTemp) +
            "°F"
          : Math.floor(celsiusDayTemp) +
            "°C" +
            " " +
            "/" +
            " " +
            Math.floor(celsiusDayFeelsLikeTemp) +
            "°C"}
      </div>
    </div>
  );
};

export default ForecastItem;
