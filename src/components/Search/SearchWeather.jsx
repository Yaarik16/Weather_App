import React, { useState } from "react";
import sunicon from "../../icons/sun.png";
import "./../Weather/Weather.css";

const SearchWeather = (props) => {
  const api = {
    key: "5459771b5760c101a1b553114f3086d4",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [day, setDay] = useState("");
  const [dayTime, setDayTime] = useState("");

  function time() {
    const date = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setDay(daysOfWeek[date.getDay()]);
    setDayTime(date.toLocaleTimeString());
  }
  setInterval(time, 1000);
  return (
    <>
      <div className="temperature-container">
        {props.allWeather.main === undefined ? null : (
          <>
            <div className="weather-icon">
              <img src={sunicon} alt="weather-icon" />
            </div>
            <div className="temperature">
              <p>{Math.round(props.allWeather.main.temp)}°C</p>
              <p className="city-time">
                {day}, <span>{dayTime}</span>
              </p>
            </div>
          </>
        )}
      </div>
      <div className="search-description">
        <div className="clouds">
          <p>
            {props.allWeather.main === undefined
              ? null
              : `Description: ${props.allWeather.weather[0].main}, (${props.allWeather.weather[0].description})`}
          </p>
          <p className="temperature-feels-like">
            {props.allWeather.main === undefined
              ? null
              : `Fells like: ${Math.round(props.allWeather.main.feels_like)}°C`}
          </p>
        </div>
        <div className="city-name">
          <p>
            {props.allWeather.sys === undefined
              ? null
              : `${props.allWeather.name}, ${props.allWeather.sys.country}`}
          </p>
        </div>
      </div>
    </>
  );
};

export default SearchWeather;
