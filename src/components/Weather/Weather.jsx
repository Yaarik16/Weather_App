import { useState } from "react";
import Search from "../Search/Search";

const Weather = () => {
  const api = {
    key: "5459771b5760c101a1b553114f3086d4",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [search, setSearch] = useState("");
  const [weatherConditions, setWeatherConditions] = useState({});

  const searchPressed = () => {
    if (search === "") {
      alert(`You can't submit an empty field. Please type a city!`);
    }
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
    <div>
      {/* <Search onSearchChange={handleOnSearchChange} /> */}

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </form>
      </div>
      <p>
        {weatherConditions.sys === undefined
          ? null
          : `${weatherConditions.name}, ${weatherConditions.sys.country}`}
      </p>
      <p>
        {weatherConditions.main === undefined
          ? null
          : ` ${Math.round(weatherConditions.main.temp)}°C`}
      </p>
      <p>
        {weatherConditions.weather === undefined
          ? null
          : `${weatherConditions.weather[0].main}`}
      </p>
      <p>
        {weatherConditions.weather === undefined
          ? null
          : `(${weatherConditions.weather[0].description})`}
      </p>
    </div>
  );
};

export default Weather;
