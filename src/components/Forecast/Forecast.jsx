import React, { useState } from "react";
const api = {
  key: "5459771b5760c101a1b553114f3086d4",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Forecast = (props) => {
  const [forecast, setForcast] = useState({});
  const forcastPressed = () => {
    // Forecast
    fetch(
      `${api.base}forecast?lat=${
        props.coords === undefined ? null : props.coords.lat
      }&lon=${
        props.coords === undefined ? null : props.coords.lon
      }&units=metric&appid=${api.key}`
    )
      .then((response) => response.json())
      .then(props.setTrigger(true))
      .then((result) => {
        console.log(result);
        setForcast(result);
      });
  };

  return props.trigger ? (
    <p>Forecast for 7 days</p>
  ) : (
    <div>
      <button onClick={forcastPressed}>Load Forecast</button>
    </div>
  );
};

export default Forecast;
