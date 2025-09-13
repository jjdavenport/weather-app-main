import { useState, useEffect } from "react";
import {
  Footer,
  Wrapper,
  Container,
  Header,
  Title,
  Form,
  Main,
  List,
  DailyList,
  HourlyList,
  Error,
  NoResults,
} from "./components/content";
import drizzle from "./assets/images/icon-drizzle.webp";
import fog from "./assets/images/icon-fog.webp";
import overcast from "./assets/images/icon-overcast.webp";
import partlyCloudy from "./assets/images/icon-partly-cloudy.webp";
import rain from "./assets/images/icon-rain.webp";
import snow from "./assets/images/icon-snow.webp";
import sunny from "./assets/images/icon-sunny.webp";

function App() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(true);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState("celsius");
  const [precipitation, setPrecipitation] = useState("in");
  const [windSpeedUnit, setWindSpeedUnit] = useState("mph");

  const fetchLatLong = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const result = await response.json();
    setLat(result.latitude);
    setLong(result.longitude);
    setCity(result.city);
    setCountry(result.country_name);
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code,precipitation,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m&temperature_unit=${temperature}&windspeed_unit=${windSpeedUnit}`,
      );
      const result = await response.json();
      setWeather(result);
      setError(false);
      setLoading(false);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    fetchLatLong();
  }, []);

  useEffect(() => {
    if (
      lat != null &&
      long != null &&
      temperature != null &&
      precipitation != null &&
      windSpeedUnit != null
    ) {
      fetchWeather();
    }
  }, [lat, long, temperature, precipitation, windSpeedUnit]);

  useEffect(() => {
    console.log(city);
    console.log(country);
  }, [country, city]);

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  return (
    <Wrapper>
      <Container>
        <Header
          setPrecipitation={setPrecipitation}
          setWindSpeedUnit={setWindSpeedUnit}
          setTemperature={setTemperature}
        />
        {error ? (
          <Error />
        ) : (
          <>
            <Title />
            <Form searching={searching} />
            {results ? (
              <>
                <div className="flex w-11/12 flex-col gap-4 lg:grid lg:w-full lg:grid-cols-6 lg:grid-rows-6 lg:gap-x-6 lg:gap-y-8">
                  <Main country={country} city={city} loading={loading} />
                  <List loading={loading} />
                  <DailyList />
                  <HourlyList loading={loading} />
                </div>
              </>
            ) : (
              <NoResults />
            )}
          </>
        )}
      </Container>
      <Footer />
    </Wrapper>
  );
}

export default App;
