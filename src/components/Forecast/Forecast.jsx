import React, { useEffect, useState } from "react";
const api = {
  key: "5459771b5760c101a1b553114f3086d4",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Forecast = ({ coords }) => {
  const [forecast, setForcast] = useState({});
  const forcastPressed = () => {
    // Forecast
    fetch(
      `${api.base}forecast?lat=${
        coords === undefined ? null : coords.lat
      }&lon=${coords === undefined ? null : coords.lon}&units=metric&appid=${
        api.key
      }`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setForcast(result);
      });
  };

  return (
    <div>
      <button onClick={forcastPressed}>Load Forecast</button>
    </div>
  );
};

export default Forecast;
