import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import logo from "../../icons/apple-touch-icon.png";
import Forecast from "../Forecast/Forecast";
import Highlights from "../Highlights/Highlights";
import Search from "../Search/Search";
import SearchWeather from "../Search/SearchWeather";
import "./Weather.css";

const Weather = () => {
  const api = {
    key: "5459771b5760c101a1b553114f3086d4",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  const [search, setSearch] = useState("");
  const [weatherConditions, setWeatherConditions] = useState({});

  const searchPressed = () => {
    if (search === "") {
      alert(`You can't submit an empty field. Please type the city name`);
    }
    //Weather
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((response) => response.json())
      .catch((err) => console.log(err))
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

      {weatherConditions.weather === undefined ? (
        <>
          <div className="forecast-container-off-wrapper">
            <img src={logo} draggable="false" alt="" />
            <span>ExactWeather.com</span>com
            <form className="search-form-off" onSubmit={handleSubmit}>
              <input
                className="search-input-off"
                type="text"
                placeholder="Search for city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="search-btn-off"
                onClick={searchPressed}
              ></button>
            </form>
            <div className="search-container">
              <SearchWeather allWeather={weatherConditions} />
            </div>
            <div className="forecast-container-off">
              ExactWeather.com is your premier destination for accurate and
              reliable weather forecasts, providing you with the essential
              information you need to plan your day or week.
            </div>
          </div>
        </>
      ) : (
        <>
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
          <div className="forecast-container">
            <Highlights weatherConditions={weatherConditions} />
            <div className="week-forecast">
              {weatherConditions.weather === undefined ? null : (
                <Forecast
                  coords={weatherConditions.coord}
                  weatherConditions={weatherConditions}
                  api={api}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
