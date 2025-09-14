import logo from "../assets/images/logo.svg";
import settings from "../assets/images/icon-units.svg";
import chevron from "../assets/images/icon-dropdown.svg";
import search from "../assets/images/icon-search.svg";
import cross from "../assets/images/icon-error.svg";
import tick from "../assets/images/icon-checkmark.svg";
import loading from "../assets/images/icon-loading.svg";
import type React from "react";
import { RefreshCw } from "lucide-react";
import { useRef, useState, type SetStateAction } from "react";

type Prop = {
  children: React.ReactNode;
};

export const Wrapper = ({ children }: Prop) => {
  return (
    <>
      <div className="flex h-full min-h-screen w-full flex-col items-center gap-4 bg-neutral-900 text-lg">
        {children}
      </div>
    </>
  );
};

export const Container = ({ children }: Prop) => {
  return (
    <>
      <div className="flex w-full max-w-6xl flex-1 flex-col items-center gap-4 pt-4 md:max-w-5xl lg:gap-10">
        {children}
      </div>
    </>
  );
};

export const Footer = () => {
  return (
    <>
      <footer className="text-neutral-0 text-center text-xs">
        Challenge by{" "}
        <a
          className="underline"
          href="https://www.frontendmentor.io?ref=challenge"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a className="underline" href="https://github.com/jjdavenport">
          jjdavenport
        </a>
        .
      </footer>
    </>
  );
};

type HeaderProps = {
  setTemperature: React.Dispatch<SetStateAction<string>>;
  setWindSpeedUnit: React.Dispatch<SetStateAction<string>>;
  setPrecipitation: React.Dispatch<SetStateAction<string>>;
};

export const Header = ({
  setTemperature,
  setWindSpeedUnit,
  setPrecipitation,
}: HeaderProps) => {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState({
    unit: "Metric",
    temperature: "Celsius (°C)",
    wind: "km/h",
    precipitation: "Millimeters (mm)",
  });
  return (
    <>
      <header className="relative flex w-11/12 justify-between lg:w-full">
        <img className="object-contain" src={logo} alt="logo" />
        <HeaderDropdown open={menu} onClick={() => setMenu(!menu)} />
        {menu && (
          <HeaderMenu
            selected={selected}
            setSelected={setSelected}
            setPrecipitation={setPrecipitation}
            setWindSpeedUnit={setWindSpeedUnit}
            setTemperature={setTemperature}
            onClose={() => setMenu(false)}
          />
        )}
      </header>
    </>
  );
};

type HeaderDropdownProp = {
  onClick: () => void;
  open: boolean;
};

const HeaderDropdown = ({ onClick, open }: HeaderDropdownProp) => {
  return (
    <nav>
      <button
        onClick={onClick}
        className="font-DM-Sans text-neutral-0 focus:outline-neutral-0 flex cursor-pointer gap-2 rounded-lg bg-neutral-800 px-3 py-1 transition-colors hover:bg-neutral-700 focus:outline-2 focus:outline-offset-[0.1875rem]"
      >
        <img className="object-contain" src={settings} alt="settings" />
        Units
        <img
          className={`${open ? "rotate-180" : "rotate-0"} object-contain transition-all duration-100`}
          src={chevron}
          alt="chevron"
        />
      </button>
    </nav>
  );
};

type HeaderMenuProps = {
  onClose: () => void;
  setTemperature: React.Dispatch<SetStateAction<string>>;
  setWindSpeedUnit: React.Dispatch<SetStateAction<string>>;
  setPrecipitation: React.Dispatch<SetStateAction<string>>;
  selected: {
    unit: string;
    precipitation: string;
    wind: string;
    temperature: string;
  };
  setSelected: React.Dispatch<SetStateAction<object>>;
};

const HeaderMenu = ({
  onClose,
  setTemperature,
  setWindSpeedUnit,
  setPrecipitation,
  selected,
  setSelected,
}: HeaderMenuProps) => {
  const handleUnitClick = () => {
    if (selected.unit === "Imperial") {
      setSelected({
        unit: "Metric",
        temperature: "Celsius (°C)",
        wind: "km/h",
        precipitation: "Millimeters (mm)",
      });
      setTemperature("celsius");
      setWindSpeedUnit("kmh");
      setPrecipitation("mm");
    } else {
      setSelected({
        unit: "Imperial",
        temperature: "Fahrenheit (°F)",
        wind: "mph",
        precipitation: "Inches (in)",
      });
      setTemperature("fahrenheit");
      setWindSpeedUnit("mph");
      setPrecipitation("in");
    }
    onClose();
  };

  const handleTemperatureClick = (value: string) => {
    setSelected((prev) => ({ ...prev, temperature: value }));
    if (value === "Celsius (°C)") {
      setTemperature("celsius");
    } else {
      setTemperature("fahrenheit");
    }
  };

  const handleWindSpeedClick = (value: string) => {
    setSelected((prev) => ({ ...prev, wind: value }));
    if (value === "mph") {
      setWindSpeedUnit("mph");
    } else {
      setWindSpeedUnit("kmh");
    }
  };

  const handlePrecipitationClick = (value: string) => {
    setSelected((prev) => ({ ...prev, precipitation: value }));
    if (value === "Millimeters (mm)") {
      setPrecipitation("mm");
    } else {
      setPrecipitation("in");
    }
  };

  return (
    <>
      <div className="absolute top-12 right-0 z-40 flex w-full flex-col rounded-lg border border-neutral-600 bg-neutral-800 p-2 shadow-lg lg:w-3/12">
        <button
          onClick={handleUnitClick}
          className="text-neutral-0 focus:outline-neutral-0 cursor-pointer rounded-lg px-2 py-1 text-left hover:bg-neutral-700 focus:outline focus:outline-offset-1"
        >
          Switch to {selected.unit === "Imperial" ? "Metric" : "Imperial"}
        </button>
        <div className="flex flex-col divide-y divide-neutral-600">
          <HeaderListItem
            setButton={(value) => handleTemperatureClick(value)}
            selected={selected.temperature}
            label="Temperature"
            buttonOne="Celsius (°C)"
            buttonTwo="Fahrenheit (°F)"
          />
          <HeaderListItem
            setButton={(value) => handleWindSpeedClick(value)}
            selected={selected.wind}
            label="Wind Speed"
            buttonOne="km/h"
            buttonTwo="mph"
          />
          <HeaderListItem
            setButton={(value) => handlePrecipitationClick(value)}
            selected={selected.precipitation}
            label="Precipitation"
            buttonOne="Millimeters (mm)"
            buttonTwo="Inches (in)"
          />
        </div>
      </div>
    </>
  );
};

type HeaderListItemsProp = {
  label: string;
  buttonOne: string;
  buttonTwo: string;
  selected: string;
  setButton: React.Dispatch<SetStateAction<boolean>>;
};

const HeaderListItem = ({
  label,
  buttonOne,
  buttonTwo,
  selected,
  setButton,
}: HeaderListItemsProp) => {
  return (
    <>
      <li className="flex flex-col gap-1 py-1">
        <label className="px-2 py-1 text-neutral-200">{label}</label>
        <HeaderListButton
          onClick={setButton}
          selected={selected}
          text={buttonOne}
        />
        <HeaderListButton
          onClick={setButton}
          selected={selected}
          text={buttonTwo}
        />
      </li>
    </>
  );
};

type HeaderListButtonProp = {
  text: string;
  selected: string;
  onClick: () => void;
};

const HeaderListButton = ({
  text,
  selected,
  onClick,
}: HeaderListButtonProp) => {
  return (
    <button
      onClick={() => onClick(text)}
      className={`${selected === text ? "bg-neutral-700" : "hover:bg-neutral-700"} text-neutral-0 focus:outline-neutral-0 flex cursor-pointer justify-between rounded-lg px-2 py-1 text-left transition-colors focus:outline focus:outline-offset-1`}
    >
      {selected === text ? (
        <>
          {text}
          <img src={tick} alt="tick" />
        </>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};

export const Title = () => {
  return (
    <>
      <h1 className="font-DM-Sans text-neutral-0 w-9/12 text-center text-5xl font-bold lg:w-full lg:text-6xl">
        How's the sky looking today?
      </h1>
    </>
  );
};

type FormProp = {
  searching: boolean;
};

export const Form = ({ searching }: FormProp) => {
  return (
    <form className="flex w-full flex-col items-center gap-4 lg:w-7/12 lg:flex-row">
      <Search searching={searching} />
      <SearchButton />
    </form>
  );
};

type SearchProp = {
  searching: boolean;
};

const Search = ({ searching }: SearchProp) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current && inputRef.current.focus();
    setOpen(!open);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="focus-within:outline-neutral-0 relative flex w-11/12 cursor-pointer gap-4 rounded-lg bg-neutral-800 px-4 py-2 transition-colors focus-within:outline-2 focus-within:outline-offset-[0.1875rem] hover:bg-neutral-700 lg:w-full"
      >
        <img src={search} alt="search" />
        <input
          ref={inputRef}
          className="font-DM-Sans w-full cursor-pointer placeholder:text-neutral-200 focus:outline-none"
          type="text"
          placeholder="Search for a place…"
        />
        {open && searching && <SearchInProgress />}
        {open && !searching && <SearchList />}
      </div>
    </>
  );
};

const SearchList = () => {
  const list = ["City Name", "City Name", "City Name", "City Name"];
  return (
    <>
      <ul className="absolute top-28 left-0 flex w-full flex-col gap-1 rounded-lg bg-neutral-800 p-2 shadow-lg lg:top-14">
        {list.map((i, index) => (
          <SearchListItem text={i} key={index} />
        ))}
      </ul>
    </>
  );
};

type SearchListitemProp = {
  text: string;
};

const SearchListItem = ({ text }: SearchListitemProp) => {
  return (
    <>
      <li>
        <button className="text-neutral-0 focus:outline-neutral-0 w-full cursor-pointer rounded-lg p-1 outline-neutral-600 hover:bg-neutral-700 hover:outline focus:outline focus:outline-offset-1 lg:px-2 lg:text-left">
          {text}
        </button>
      </li>
    </>
  );
};

const SearchInProgress = () => {
  return (
    <>
      <div className="absolute top-14 left-0 flex w-full gap-4 rounded-lg bg-neutral-800 p-2 shadow-lg">
        <img src={loading} className="animate-spin" alt="loading" />
        <span className="text-neutral-0 font-DM-Sans">Search in progress</span>
      </div>
    </>
  );
};

const SearchButton = () => {
  return (
    <>
      <button className="font-DM-Sans text-neutral-0 w-11/12 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors hover:bg-blue-700 focus:outline-2 focus:outline-offset-[0.1875rem] focus:outline-blue-500 lg:w-3/12">
        Search
      </button>
    </>
  );
};

type MainProps = {
  loading: boolean;
  city: string;
  country: string;
  src: string;
  temperature: string;
};

export const Main = ({
  loading,
  city,
  country,
  src,
  temperature,
}: MainProps) => {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <>
      <main
        className={`${loading ? "bg-neutral-800" : "bg-main-mobile lg:bg-main-desktop"} flex h-68 items-center justify-center rounded-3xl bg-cover bg-right bg-no-repeat lg:col-span-4 lg:col-start-1 lg:row-span-3 lg:row-start-1`}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="font-DM-Sans relative flex w-full items-end justify-center gap-2 tracking-widest text-neutral-200">
              <Circle size={12} className="animate-pulse fill-neutral-200" />
              <div className="pb-1">
                <Circle size={12} className="animate-pulse fill-neutral-200" />
              </div>
              <Circle size={12} className="animate-pulse fill-neutral-200" />
            </div>
            <span className="font-DM-Sans animate-pulse text-neutral-200">
              Loading…
            </span>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <div className="flex flex-col items-center">
              <h1 className="font-DM-Sans text-neutral-0 text-center text-2xl font-medium">
                {city}, {` `}
                {country}
              </h1>
              <span className="font-DM-Sans text-neutral-200">
                {`${days[new Date().getDay()]}, ${months[new Date().getMonth()]}, ${new Date().getDay()}, ${new Date().getFullYear()}`}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <img className="w-20 object-contain" src={src} alt="weather" />
              <span className="font-DM-Sans text-neutral-0 text-6xl font-bold italic">
                {temperature}°
              </span>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

type ListProps = {
  loading: boolean;
  precipitationUnit: string;
  windSpeedUnit: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
};

export const List = ({
  loading,
  precipitationUnit,
  windSpeedUnit,
  precipitation,
  humidity,
  windSpeed,
  feelsLike,
}: ListProps) => {
  return (
    <>
      <ul className="grid grid-cols-2 grid-rows-2 gap-4 lg:col-span-4 lg:col-start-1 lg:row-start-4 lg:grid-cols-4 lg:grid-rows-1">
        <ListItem
          loading={loading}
          text="Feels like"
          value={feelsLike}
          unit="°"
        />
        <ListItem loading={loading} text="Humidity" value={humidity} unit="%" />
        <ListItem
          loading={loading}
          text="Wind"
          value={windSpeed}
          unit={windSpeedUnit}
        />
        <ListItem
          loading={loading}
          text="Precipitation"
          value={precipitation}
          unit={precipitationUnit}
        />
      </ul>
    </>
  );
};

type ListItemProps = {
  text: string;
  unit: string;
  loading: boolean;
  value: number;
};

const ListItem = ({ text, unit, loading, value }: ListItemProps) => {
  return (
    <li className="font-DM-Sans text-neutral-0 flex flex-col gap-4 rounded-xl border border-neutral-600 bg-neutral-800 px-4 py-3">
      <span className="text-neutral-200">{text}</span>
      <span
        className={`${loading ? "animate-pulse text-neutral-200" : "text-neutral-0"} text-3xl`}
      >
        {loading ? "_" : unit === "%" ? `${value} ${unit}` : `${value} ${unit}`}
      </span>
    </li>
  );
};

export const DailyList = () => {
  return (
    <>
      <section className="flex flex-col gap-2 lg:col-span-4 lg:row-span-2 lg:row-start-5 lg:gap-4">
        <span className="text-neutral-0 font-DM-Sans">Daily forecast</span>
        <ul className="grid grid-cols-2 grid-rows-3 gap-4 lg:h-full lg:grid-cols-7 lg:grid-rows-1">
          <DailyListItem />
          <DailyListItem />
          <DailyListItem />
          <DailyListItem />
          <DailyListItem />
          <DailyListItem />
          <DailyListItem />
        </ul>
      </section>
    </>
  );
};

type DailyListItemProps = {
  day: string;
  src: string;
  alt: string;
  high: string;
  low: string;
};

const DailyListItem = ({ day, src, alt, high, low }: DailyListItemProps) => {
  return (
    <>
      <li className="rounded-xl border border-neutral-600 bg-neutral-800 p-16 lg:p-0">
        <span>{day}</span>
        <img src={src} alt={alt} />
        <div>
          <span>{high}</span>
          <span>{low}</span>
        </div>
      </li>
    </>
  );
};

type HourlyListProp = {
  loading: boolean;
  day: string;
  setDay: React.Dispatch<SetStateAction<string>>;
};

export const HourlyList = ({ loading, day, setDay }: HourlyListProp) => {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <section className="flex flex-col gap-4 rounded-xl bg-neutral-800 p-4 lg:col-span-2 lg:col-start-5 lg:row-span-6 lg:row-start-1">
        <div className="relative flex justify-between">
          <span className="text-neutral-0 font-DM-Sans">Hourly forecast</span>
          <HourlyDropDown
            text={day}
            loading={loading}
            open={menu}
            onClick={() => setMenu(!menu)}
          />
          {menu && (
            <HourlyDropDownList
              state={day}
              setMenu={setMenu}
              setState={setDay}
            />
          )}
        </div>
        <ul className="flex flex-col gap-4">
          <HourlyListItem loading={loading} />
          <HourlyListItem loading={loading} />
          <HourlyListItem loading={loading} />
          <HourlyListItem loading={loading} />
          <HourlyListItem loading={loading} />
          <HourlyListItem loading={loading} />
          <HourlyListItem loading={loading} />
          <HourlyListItem loading={loading} />
        </ul>
      </section>
    </>
  );
};

type HourlyListItemProps = {
  src: string;
  alt: string;
  time: string;
  temp: string;
  loading: boolean;
};

const HourlyListItem = ({
  src,
  alt,
  time,
  temp,
  loading,
}: HourlyListItemProps) => {
  return (
    <>
      <li
        className={`${loading && "animate-pulse"} h-10 w-full rounded-lg border border-neutral-600 bg-neutral-700`}
      >
        <div>
          <img src={src} alt={alt} />
          <span>{time}</span>
        </div>
        <span>{temp}</span>
      </li>
    </>
  );
};

type HourlyDropDownProp = {
  loading: boolean;
  open: boolean;
  onClick: () => void;
  text: string;
};

const HourlyDropDown = ({
  loading,
  open,
  onClick,
  text,
}: HourlyDropDownProp) => {
  return (
    <>
      <nav>
        <button
          onClick={onClick}
          className="font-DM-Sans text-neutral-0 focus:outline-neutral-0 flex cursor-pointer gap-2 rounded-lg bg-neutral-600 px-3 py-1 transition-colors hover:bg-neutral-700 focus:outline-2 focus:outline-offset-[0.1875rem]"
        >
          {loading ? "-" : text}{" "}
          <img
            className={`${open ? "rotate-180" : "rotate-0"} transition-all duration-100`}
            src={chevron}
            alt="chevron"
          />
        </button>
      </nav>
    </>
  );
};

type HourlyDropDownListProps = {
  setState: React.Dispatch<SetStateAction<string>>;
  setMenu: React.Dispatch<SetStateAction<boolean>>;
  state: string;
};

const HourlyDropDownList = ({
  setState,
  setMenu,
  state,
}: HourlyDropDownListProps) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleClick = (text: string) => {
    setState(text);
    setMenu(false);
  };

  return (
    <>
      <ul className="font-DM-Sans text-neutral-0 absolute top-12 left-0 z-50 flex w-full flex-col gap-2 rounded-xl border border-neutral-600 bg-neutral-800 p-2 shadow-lg lg:right-0 lg:left-auto lg:w-8/12">
        {days.map((i, index) => (
          <HourlyDropDownButton
            state={state}
            onClick={handleClick}
            key={index}
            text={i}
          />
        ))}
      </ul>
    </>
  );
};

type HourlyDropDownButtonProp = {
  text: string;
  onClick: () => void;
  state: string;
};

const HourlyDropDownButton = ({
  text,
  onClick,
  state,
}: HourlyDropDownButtonProp) => {
  return (
    <>
      <li>
        <button
          className={`${state === text ? "bg-neutral-700" : "bg-transparent"} focus:outline-neutral-0 w-full cursor-pointer rounded-lg p-1 transition-colors hover:bg-neutral-700 focus:outline focus:outline-offset-1 lg:px-2 lg:text-left`}
          onClick={() => onClick(text)}
        >
          {text}
        </button>
      </li>
    </>
  );
};

export const Error = () => {
  return (
    <>
      <section className="flex flex-1 flex-col items-center justify-center gap-4">
        <img className="w-12 object-contain" src={cross} alt="error" />
        <span className="text-neutral-0 font-Bricolage-Grotesque text-center text-3xl font-medium lg:text-5xl">
          Something went wrong
        </span>
        <p className="font-DM-Sans w-60 text-center leading-5 text-neutral-200 lg:w-96">
          We couldn't connect server (API error).Please try again in a few
          moments.
        </p>
        <button className="text-neutral-0 font-DM-Sans focus:outline-neutral-0 flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-800 px-4 py-1 transition-colors hover:bg-neutral-700 focus:outline-2 focus:outline-offset-[0.1875rem]">
          <RefreshCw className="w-4" />
          Retry
        </button>
      </section>
    </>
  );
};

export const NoResults = () => {
  return (
    <>
      <span>No search result found!</span>
    </>
  );
};

type CircleProps = {
  size: number;
  className: string;
};

const Circle = ({ size, className }: CircleProps) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    className={className}
  >
    <circle cx={size / 2} cy={size / 2} r={size / 2} className={className} />
  </svg>
);
