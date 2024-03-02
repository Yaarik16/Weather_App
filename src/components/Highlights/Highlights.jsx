import React from "react";
import humidity_icon from "./../../icons/humidity-icon.png";
import humidity from "./../../icons/humidity.png";
import pressure from "./../../icons/perssure.png";
import sunrise from "./../../icons/sunrise.png";
import sunset from "./../../icons/sunset.png";
import wind from "./../../icons/wind.png";
import "./Highlights.css";

const Highlights = (props) => {
  return (
    <>
      <div className="day-hightlights">
        {props.weatherConditions.sys === undefined ? null : (
          <div className="day-title">Today's hightlights</div>
        )}
        <div
          className={
            props.weatherConditions.sys === undefined
              ? "day-info-off"
              : "day-info"
          }
        >
          <div className="day-item-sun">
            {props.weatherConditions.sys === undefined ? null : (
              <>
                <div className="sun-container">
                  <img src={sunrise} alt="" />
                  <p>
                    <span>Sunrise: </span>{" "}
                    {new Date(
                      props.weatherConditions.sys.sunrise * 1000
                    ).toLocaleTimeString("en-US")}
                  </p>
                </div>
                <div className="sun-container">
                  <img src={sunset} className="sunrise" alt="" />
                  <p>
                    <span>Sunset: </span>{" "}
                    {new Date(
                      props.weatherConditions.sys.sunset * 1000
                    ).toLocaleTimeString("en-US")}
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="day-item-pressure">
            {props.weatherConditions.main === undefined ? null : (
              <div className="pressure-container">
                <img src={pressure} alt="" />
                <p>
                  <span>Air pressure: </span>{" "}
                  {props.weatherConditions.main.pressure} Pa
                </p>
              </div>
            )}
          </div>
          <div className="day-item-humidity">
            {props.weatherConditions.main === undefined ? null : (
              <div className="humidity-container">
                <img src={humidity} className="humidity" alt="" />
                <p>Humidity: {props.weatherConditions.main.humidity}%</p>
              </div>
            )}
          </div>
          <div className="day-item-wind">
            {props.weatherConditions.wind === undefined ? null : (
              <div className="wind-container">
                <img src={wind} className="wind" alt="" />
                <p>Wind speed: {props.weatherConditions.wind.speed}km/h</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Highlights;
