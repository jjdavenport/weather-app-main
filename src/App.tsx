import { useState, useEffect } from "react";
import {
  Footer,
  Wrapper,
  Container,
  Header,
  Title,
  Search,
  Button,
  Main,
  List,
  DailyList,
  HourlyList,
  Error,
  NoResults,
} from "./components/content";

function App() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(true);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [weather, setWeather] = useState(null);

  const fetchLatLong = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const result = await response.json();
    setLat(result.latitude);
    setLong(result.longitude);
  };

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code`,
    );
    const result = await response.json();
    setWeather(result);
  };

  useEffect(() => {
    fetchLatLong();
  }, []);

  useEffect(() => {
    if (lat != null && long != null) {
      fetchWeather();
    }
  }, [lat, long]);

  useEffect(() => {
    console.log(lat);
    console.log(long);
  }, [lat, long]);

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  return (
    <Wrapper>
      <Container>
        <Header />
        {error ? (
          <Error />
        ) : (
          <>
            <Title />
            <Search searching={searching} />
            <Button />
            {results ? (
              <>
                <Main loading={loading} />
                <List loading={loading} />
                <DailyList />
                <HourlyList loading={loading} />
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
