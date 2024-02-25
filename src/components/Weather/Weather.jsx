import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import logo from "../../icons//logo-2.svg";
import Forecast from "../Forecast/Forecast";
import Search from "../Search/Search";
import SearchWeather from "../Search/SearchWeather";
import humidity_icon from "./../../icons/humidity-icon.png";
import "./Weather.css";

const Weather = () => {
  const api = {
    key: "5459771b5760c101a1b553114f3086d4",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  const [search, setSearch] = useState("");
  const [weatherConditions, setWeatherConditions] = useState({});
  const [forecastSwitch, setForecastSwitch] = useState(false);

  const searchPressed = () => {
    if (search === "") {
      alert(`You can't submit an empty field. Please type the city name!`);
    }
    //Weather
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((response) => response.json())
      .catch((err) => console.log(err))
      .then(setForecastSwitch(false))
      .then((result) => {
        console.log(result);
        setWeatherConditions(result);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch("");
  };

  return (
    <div className="weather-container">
      {/* <Search onSearchChange={handleOnSearchChange} /> */}

      <div className="search-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search for city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn" onClick={searchPressed}>
            <BiSearchAlt2 className="search-icon" />
          </button>
        </form>
        <div className="search-container">
          <SearchWeather allWeather={weatherConditions} />
        </div>
      </div>
      {weatherConditions.weather === undefined ? (
        <div className="forecast-container-off-wrapper">
          <img src={logo} alt="" />
          <div className="forecast-container-off">
            ExactWeather.com is your premier destination for accurate and
            reliable weather forecasts, providing you with the essential
            information you need to plan your day and week.
          </div>
        </div>
      ) : (
        <div className="forecast-container">
          <div className="day-hightlights">
            {weatherConditions.sys === undefined ? null : (
              <div className="day-title">Today's hightlights</div>
            )}
            <div
              className={
                weatherConditions.sys === undefined
                  ? "day-info-off"
                  : "day-info"
              }
            >
              <div className="day-item-sunset">
                {weatherConditions.sys === undefined
                  ? null
                  : `${new Date(
                      weatherConditions.sys.sunrise * 1000
                    ).toLocaleTimeString("en-US")}, ${new Date(
                      weatherConditions.sys.sunset * 1000
                    ).toLocaleTimeString("en-US")}`}
              </div>
              <div className="day-item-presure">
                {weatherConditions.main === undefined
                  ? null
                  : `Pressure: ${weatherConditions.main.pressure}`}
              </div>
              <div className="day-item-humidity">
                {weatherConditions.main === undefined ? null : (
                  <>
                    <div className="humidity-title">
                      <p>Humidity</p>
                    </div>
                    <img src={humidity_icon} alt="" />
                    <p className="humidity">{`${weatherConditions.main.humidity}%`}</p>
                  </>
                )}
              </div>
              <div className="day-item-wind">
                {weatherConditions.wind === undefined
                  ? null
                  : `Wind speed: ${weatherConditions.wind.speed}m/s`}
              </div>
            </div>
          </div>
          <div className="week-forecast">
            {weatherConditions.weather === undefined ? null : (
              <Forecast
                trigger={forecastSwitch}
                setTrigger={setForecastSwitch}
                coords={weatherConditions.coord}
                weatherConditions={weatherConditions}
                api={api}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
