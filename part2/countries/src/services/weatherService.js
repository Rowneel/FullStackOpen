import axios from "axios";
const baseUrl = `https://api.openweathermap.org/data/2.5`;

const getWeather = (lon, lat) => {
  const request = axios.get(
    `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_OPENWEATHER_API
    }`
  );
  return request.then((response) => response.data);
};

export default { getWeather };
