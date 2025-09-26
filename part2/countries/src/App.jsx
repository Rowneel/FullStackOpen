import { useEffect, useState } from "react";
// import "./index.css";
import countriesService from "./services/countriesService";
import weatherService from "./services/weatherService.js";

function Notification({ className, message }) {
  if (!message) {
    return;
  }
  return <div className={className}>{message}</div>;
}

function kelvinToCelsius(k) {
  return k - 273.15;
}

function CountryDetail({ country, weather }) {
  const languages = Object.values(country?.languages ?? {});
  return (
    <>
      <h1>{country?.name?.common}</h1>
      <div>{country?.capital}</div>
      <div>Area {country?.area}</div>
      <h1>Languages</h1>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country?.flags?.png} alt="country flag" />
      <h1>Weather in {weather?.name}</h1>
      <p>
        Temperature: {kelvinToCelsius(weather?.main?.temp).toPrecision(4)}{" "}
        degree celcius
      </p>
      <img
        src={` https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt=""
    width={50}
      />
      <p style={{ margin: 0 }}>{weather.weather[0].description}</p>
    <p>Wind: {weather.wind.speed} m/s</p>
    </>
  );
}

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

  const filteredCountries = allCountries.filter((country) =>
    country?.name?.common?.toLowerCase().includes(countryName.toLowerCase())
  );

  useEffect(() => {
    countriesService
      .getAll()
      .then((allCountries) => setAllCountries(allCountries))
      .catch(() => {
        setError("Could not Fetch all countries data!");
        setTimeout(() => setError(""), 5000);
      });
  }, []);

  const singleCountry =
    filteredCountries.length === 1 ? filteredCountries[0] : null;
  useEffect(() => {
    if (!singleCountry) return;

    if (!singleCountry.latlng || singleCountry.latlng.length < 2) return;
    weatherService
      .getWeather(singleCountry.latlng[1], singleCountry.latlng[0])
      .then((weatherData) => {
        console.log("Logging response", weatherData);
        setWeather(weatherData);
      })
      .catch((err) => {
        console.log("Logging err", err);
        setError(err?.response?.data?.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  }, [singleCountry]);

  console.log("Logging weather", weather);
  return (
    <div>
      <Notification className={"error"} message={error} />
      <form>
        <div>
          Country Name:
          <input
            type="text"
            onChange={(e) => setCountryName(e.target.value)}
            value={countryName}
          />
        </div>
      </form>
      {filteredCountries.length <= 10 &&
        filteredCountries.length > 2 &&
        filteredCountries?.map((country) => (
          <div key={country.cca3}>
            {country?.name?.common} {country?.capitalInfo?.latlng?.join(" ")}
          </div>
        ))}
      {countryName && filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {filteredCountries.length === 1 && (
        <CountryDetail country={filteredCountries[0]} weather={weather} />
      )}
    </div>
  );
}

export default App;
