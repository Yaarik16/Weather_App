import React, { useState } from "react";
import "./../Weather/Weather.css";

const SearchWeather = (props) => {
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
    setDayTime(
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        second: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  }
  setInterval(time, 1000);

  const date = new Date();
  const options = { month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <>
      <div
        className={
          props.allWeather.main === undefined
            ? "temperature-container-off"
            : "temperature-container"
        }
      >
        {props.allWeather.main === undefined ? null : (
          <>
            <div className="weather-icon">
              <img
                src={`../../icons/${props.allWeather.weather[0].icon}.png`}
                alt="weather-icon"
                draggable="false"
              />
            </div>
            <div className="temperature">
              <p>
                {Math.round(props.allWeather.main.temp)}°C /{" "}
                {Math.round(props.allWeather.main.temp * 1.8 + 32)}°F
              </p>
              <p></p>
              <div className="city-time">
                {day}, {formattedDate}, <span>{dayTime}</span>
              </div>
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
              : `${props.allWeather.name}${
                  props.allWeather.sys.country === undefined
                    ? ""
                    : ", " + props.allWeather.sys.country
                }`}
          </p>
        </div>
      </div>
    </>
  );
};

export default SearchWeather;
