import { useState, useEffect, useRef } from "react";
import {
  Footer,
  Wrapper,
  Container,
  Header,
  Title,
  Form,
  Main,
  List,
  WeeklyList,
  HourlyList,
  Error,
  NoResults,
} from "./components/content";
import useData from "./hooks/useData";

function App() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [precipitationUnit, setPrecipitationUnit] = useState("in");
  const [windSpeedUnit, setWindSpeedUnit] = useState("mph");
  const [day, setDay] = useState("Monday");
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [precipitation, setPrecipitation] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("weather");
  const [input, setInput] = useState("");
  const [weeklyList, setWeeklyList] = useState([
    {
      day: "",
      high: 0,
      low: 0,
      src: "",
      alt: "",
    },
  ]);
  const [hourlyListData, setHourlyListData] = useState({});
  const [hourlyList, setHourlyList] = useState([]);
  const { weatherIcons, iconsAlt } = useData();
  const headerMenuRef = useRef(null);
  const headerButtonRef = useRef(null);
  const searchMenuRef = useRef(null);
  const searchButtonRef = useRef(null);
  const hourlyMenuRef = useRef(null);
  const hourlyButtonRef = useRef(null);

  const fetchAllCities = async () => {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/population/cities",
    );
    const result = await response.json();
  };

  const fetchCity = async () => {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/city?name=${city}`,
      );
      const result = await response.json();
      if (result.ok) {
        setLat(result.latitude);
        setLong(result.longitude);
        setCity(result.name);
        setCountry(result.country);
        setInput("");
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };

  const fetchLatLong = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const result = await response.json();
    setLat(result.latitude);
    setLong(result.longitude);
    setCity(result.city);
    setCountry(result.country_name);
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code,precipitation,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m&temperature_unit=${temperatureUnit}&windspeed_unit=${windSpeedUnit}`,
      );
      const result = await response.json();

      const {
        hourly: {
          time,
          temperature_2m,
          apparent_temperature,
          relative_humidity_2m,
          precipitation,
          wind_speed_10m,
          weather_code,
        },
      } = result;

      const days = Array.from(
        { length: temperature_2m.length / 24 },
        (_, i) => {
          const start = i * 24;
          const temps = temperature_2m.slice(start, start + 24);
          const codes = weather_code.slice(start, start + 24);

          const date = new Date(time[start]);
          const day = date.toLocaleDateString("en-GB", { weekday: "short" });

          const index = codes.reduce((a, b, _, arr) =>
            arr.filter((x) => x === a).length >=
            arr.filter((x) => x === b).length
              ? a
              : b,
          );

          return {
            day,
            high: Math.max(...temps),
            low: Math.min(...temps),
            src: weatherIcons[index],
            alt: iconsAlt[index],
          };
        },
      ).slice(-7);

      const hours = time
        .map((t, i) => {
          const today = new Date().toISOString().slice(0, 10);
          if (!t.startsWith(today)) return null;

          const code = weather_code[i];
          return {
            time: new Date(t).getHours() % 12 || 12,
            temperature: temperature_2m[i],
            code,
            src: weatherIcons[code],
            alt: iconsAlt[code],
          };
        })
        .filter(Boolean);

      const index =
        weather_code[
          time.indexOf(new Date().toISOString().slice(0, 13) + ":00")
        ];

      setWeather(result);
      setWeeklyList(days);
      setHourlyListData({
        time,
        temperature_2m,
        weather_code,
      });
      setHourlyList(hours);
      setSrc(weatherIcons[index]);
      setAlt(iconsAlt[index]);
      setWindSpeed(
        wind_speed_10m[
          time.indexOf(new Date().toISOString().slice(0, 13) + ":00")
        ],
      );
      setPrecipitation(
        precipitation[
          time.indexOf(new Date().toISOString().slice(0, 13) + ":00")
        ],
      );
      setTemperature(
        temperature_2m[
          time.indexOf(new Date().toISOString().slice(0, 13) + ":00")
        ],
      );
      setFeelsLike(
        apparent_temperature[
          time.indexOf(new Date().toISOString().slice(0, 13) + ":00")
        ].toFixed(0),
      );
      setHumidity(
        relative_humidity_2m[
          time.indexOf(new Date().toISOString().slice(0, 13) + ":00")
        ],
      );
      setLoading(false);
      setError(false);
    } catch {
      setError(true);
    }
  };

  const handleDayChange = (day: string) => {
    const { time, temperature_2m, weather_code } = hourlyListData;

    const hours = time
      .map((t, i) => {
        const date = new Date(t);
        const dayName = date.toLocaleDateString("en-GB", { weekday: "long" });

        if (dayName !== day) return null;

        const code = weather_code[i];
        return {
          time: date.getHours() % 12 || 12,
          temperature: temperature_2m[i],
          code,
          src: weatherIcons[code],
          alt: iconsAlt[code],
        };
      })
      .filter(Boolean);

    setHourlyList(hours);
  };

  useEffect(() => {
    fetchLatLong();
  }, []);

  useEffect(() => {
    if (
      lat != null &&
      long != null &&
      temperatureUnit != null &&
      precipitationUnit != null &&
      windSpeedUnit != null
    ) {
      fetchWeather();
    }
  }, [lat, long, temperatureUnit, precipitationUnit, windSpeedUnit]);

  useEffect(() => {
    console.log(city);
    console.log(country);
    console.log(hourlyList);
    console.log(hourlyListData);
    console.log(input);
  }, [country, city, hourlyList, hourlyListData, input]);

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  return (
    <Wrapper>
      <Container>
        <Header
          buttonRef={headerButtonRef}
          menuRef={headerMenuRef}
          setPrecipitation={setPrecipitationUnit}
          setWindSpeedUnit={setWindSpeedUnit}
          setTemperature={setTemperatureUnit}
        />
        {error ? (
          <Error onClick={fetchWeather} />
        ) : (
          <>
            <Title />
            <Form
              buttonRef={searchButtonRef}
              menuRef={searchMenuRef}
              onSearch={fetchCity}
              searching={searching}
              setInput={setInput}
              input={input}
            />
            {weather !== null ? (
              <>
                <div className="flex w-11/12 flex-col gap-4 lg:grid lg:w-full lg:grid-cols-6 lg:grid-rows-6 lg:gap-x-6 lg:gap-y-8">
                  <Main
                    alt={alt}
                    src={src}
                    temperature={temperature}
                    country={country}
                    city={city}
                    loading={loading}
                  />
                  <List
                    feelsLike={feelsLike}
                    precipitation={precipitation}
                    windSpeed={windSpeed}
                    humidity={humidity}
                    precipitationUnit={precipitationUnit}
                    windSpeedUnit={windSpeedUnit}
                    loading={loading}
                  />
                  <WeeklyList loading={loading} data={weeklyList} />
                  <HourlyList
                    buttonRef={hourlyButtonRef}
                    menuRef={hourlyMenuRef}
                    onClick={handleDayChange}
                    data={hourlyList}
                    day={day}
                    setDay={setDay}
                    loading={loading}
                  />
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
