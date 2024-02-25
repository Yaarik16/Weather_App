import React from "react";
import humidity_icon from "./../../icons/humidity-icon.png";

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
          <div className="day-item-sunset">
            {props.weatherConditions.sys === undefined
              ? null
              : `${new Date(
                  props.weatherConditions.sys.sunrise * 1000
                ).toLocaleTimeString("en-US")}, ${new Date(
                  props.weatherConditions.sys.sunset * 1000
                ).toLocaleTimeString("en-US")}`}
          </div>
          <div className="day-item-presure">
            {props.weatherConditions.main === undefined
              ? null
              : `Pressure: ${props.weatherConditions.main.pressure}`}
          </div>
          <div className="day-item-humidity">
            {props.weatherConditions.main === undefined ? null : (
              <>
                <div className="humidity-title">
                  <p>Humidity</p>
                </div>
                <img src={humidity_icon} alt="" />
                <p className="humidity">{`${props.weatherConditions.main.humidity}%`}</p>
              </>
            )}
          </div>
          <div className="day-item-wind">
            {props.weatherConditions.wind === undefined
              ? null
              : `Wind speed: ${props.weatherConditions.wind.speed}m/s`}
          </div>
        </div>
      </div>
    </>
  );
};

export default Highlights;
