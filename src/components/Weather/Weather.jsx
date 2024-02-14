import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import sunicon from "../../icons/sun.png";
import Forecast from "../Forecast/Forecast";
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
  const [forecastSwitch, setForecastSwitch] = useState(false);

  const searchPressed = () => {
    if (search === "") {
      alert(`You can't submit an empty field. Please type a city!`);
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
      <div className="forecast-container">
        <p>
          {weatherConditions.coord === undefined
            ? null
            : `${weatherConditions.coord.lon}, ${weatherConditions.coord.lat}`}
        </p>
        <p>
          {weatherConditions.sys === undefined
            ? null
            : `${new Date(
                weatherConditions.sys.sunrise * 1000
              ).toLocaleTimeString("en-US")}, ${new Date(
                weatherConditions.sys.sunset * 1000
              ).toLocaleTimeString("en-US")}`}
        </p>
        <p>
          {weatherConditions.weather === undefined
            ? null
            : `(${weatherConditions.weather[0].description})`}
        </p>
        {weatherConditions.weather === undefined ? null : (
          <Forecast
            trigger={forecastSwitch}
            setTrigger={setForecastSwitch}
            coords={weatherConditions.coord}
          />
        )}
      </div>
    </div>
  );
};

export default Weather;
