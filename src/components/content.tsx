import logo from "../assets/images/logo.svg";
import settings from "../assets/images/icon-units.svg";
import chevron from "../assets/images/icon-dropdown.svg";
import search from "../assets/images/icon-search.svg";
import cross from "../assets/images/icon-error.svg";
import tick from "../assets/images/icon-checkmark.svg";
import loading from "../assets/images/icon-loading.svg";
import React from "react";
import { RefreshCw } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type RefObject,
  type SetStateAction,
} from "react";
import useClick from "../hooks/useClick";
import useData from "../hooks/useData";

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
      <div className="flex w-full flex-1 flex-col items-center gap-8 md:max-w-5xl md:px-4 lg:max-w-6xl lg:gap-10 xl:px-0">
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
  menuRef: RefObject<HTMLDivElement>;
  buttonRef: RefObject<HTMLButtonElement>;
};

export const Header = ({
  setTemperature,
  setWindSpeedUnit,
  setPrecipitation,
  menuRef,
  buttonRef,
}: HeaderProps) => {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState({
    unit: "Imperial",
    temperature: "Celsius (°C)",
    wind: "mph",
    precipitation: "Inches (in)",
  });

  useClick({ open: menu, setOpen: setMenu, menuRef, buttonRef });

  return (
    <>
      <header className="relative flex w-11/12 justify-between pt-4 lg:w-full">
        <img className="w-40 object-contain lg:w-auto" src={logo} alt="logo" />
        <HeaderDropdown
          ref={buttonRef}
          open={menu}
          onClick={() => setMenu(!menu)}
        />
        <HeaderMenu
          open={menu}
          ref={menuRef}
          selected={selected}
          setSelected={setSelected}
          setPrecipitation={setPrecipitation}
          setWindSpeedUnit={setWindSpeedUnit}
          setTemperature={setTemperature}
          onClose={() => setMenu(false)}
        />
      </header>
    </>
  );
};

type HeaderDropdownProps = {
  onClick: () => void;
  open: boolean;
  ref: RefObject<HTMLButtonElement>;
};

const HeaderDropdown = ({ onClick, open, ref }: HeaderDropdownProps) => {
  return (
    <nav>
      <button
        ref={ref}
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
  ref: RefObject<HTMLDivElement>;
  open: boolean;
};

const HeaderMenu = ({
  onClose,
  setTemperature,
  setWindSpeedUnit,
  setPrecipitation,
  selected,
  setSelected,
  ref,
  open,
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
    setTemperature(value === "Celsius (°C)" ? "celsius" : "fahrenheit");
  };

  const handleWindSpeedClick = (value: string) => {
    setSelected((prev) => ({ ...prev, wind: value }));
    setWindSpeedUnit(value === "mph" ? "mph" : "kmh");
  };

  const handlePrecipitationClick = (value: string) => {
    setSelected((prev) => ({ ...prev, precipitation: value }));
    setPrecipitation(value === "Millimeters (mm)" ? "mm" : "in");
  };

  return (
    <div
      ref={ref}
      data-state={open ? "open" : "closed"}
      className={`data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 absolute top-16 right-0 z-40 flex w-full flex-col rounded-lg border border-neutral-600 bg-neutral-800 p-2 shadow-lg transition-all duration-200 data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:pointer-events-auto data-[state=open]:scale-100 data-[state=open]:opacity-100 lg:w-3/12`}
    >
      <button
        onClick={handleUnitClick}
        className="text-neutral-0 focus:outline-neutral-0 cursor-pointer rounded-lg px-2 py-1 text-left hover:bg-neutral-700 focus:outline focus:outline-offset-1"
      >
        Switch to {selected.unit === "Imperial" ? "Metric" : "Imperial"}
      </button>
      <div className="flex flex-col divide-y divide-neutral-600">
        <HeaderListItem
          setButton={handleTemperatureClick}
          selected={selected.temperature}
          label="Temperature"
          buttonOne="Celsius (°C)"
          buttonTwo="Fahrenheit (°F)"
        />
        <HeaderListItem
          setButton={handleWindSpeedClick}
          selected={selected.wind}
          label="Wind Speed"
          buttonOne="km/h"
          buttonTwo="mph"
        />
        <HeaderListItem
          setButton={handlePrecipitationClick}
          selected={selected.precipitation}
          label="Precipitation"
          buttonOne="Millimeters (mm)"
          buttonTwo="Inches (in)"
        />
      </div>
    </div>
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
  input: string;
  setInput: React.Dispatch<SetStateAction<string>>;
  onSearch: (city: string) => void;
  menuRef: RefObject<HTMLDivElement>;
  buttonRef: RefObject<HTMLButtonElement>;
  list: [];
  setList: React.Dispatch<SetStateAction<string[]>>;
  searching: boolean;
  setSearching: React.Dispatch<SetStateAction<boolean>>;
};

export const Form = ({
  onSearch,
  input,
  setInput,
  menuRef,
  buttonRef,
  list,
  setList,
  searching,
  setSearching,
}: FormProp) => {
  const [cities, setCities] = useState(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearching(true);
    onSearch(input);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target.value;
    setInput(currentInput);

    if (!currentInput) {
      setList(["London", "Paris", "New York", "Los Angeles"]);
      return;
    }

    const lowerInput = currentInput.toLowerCase();

    const filteredCities = cities
      .filter((city) => city.toLowerCase().includes(lowerInput))
      .sort((a, b) => {
        const aStarts = a.toLowerCase().startsWith(lowerInput) ? 0 : 1;
        const bStarts = b.toLowerCase().startsWith(lowerInput) ? 0 : 1;
        return aStarts - bStarts;
      })
      .slice(0, 4);

    setList(filteredCities);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col items-center gap-3 lg:w-7/12 lg:flex-row"
    >
      <Search
        searching={searching}
        setCities={setCities}
        onSearch={onSearch}
        list={list}
        menuRef={menuRef}
        buttonRef={buttonRef}
        value={input}
        onChange={(e) => handleChange(e)}
      />
      <SearchButton />
    </form>
  );
};

type SearchProps = {
  searching: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  menuRef: RefObject<HTMLDivElement>;
  buttonRef: RefObject<HTMLButtonElement>;
  list: [];
  onSearch: (city: string) => void;
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
};

const Search = ({
  value,
  onChange,
  menuRef,
  buttonRef,
  list,
  onSearch,
  setCities,
  searching,
}: SearchProps) => {
  const [open, setOpen] = useState(false);
  const { citiesData } = useData();
  const inputRef = useRef(null);

  useClick({ open, setOpen, menuRef, buttonRef });

  const handleClick = () => {
    inputRef.current && inputRef.current.focus();
    setCities(citiesData);
    setOpen(!open);
  };

  return (
    <>
      <div
        ref={buttonRef}
        onClick={handleClick}
        className="focus-within:outline-neutral-0 relative flex w-11/12 cursor-pointer gap-4 rounded-lg bg-neutral-800 px-4 py-2 transition-colors focus-within:outline-2 focus-within:outline-offset-[0.1875rem] hover:bg-neutral-700 lg:w-full"
      >
        <img src={search} alt="search" />
        <input
          ref={inputRef}
          className="font-DM-Sans w-full cursor-pointer text-neutral-200 placeholder:text-neutral-200 focus:outline-none"
          type="text"
          placeholder="Search for a place…"
          onChange={onChange}
          value={value}
        />
        {!open && searching && <SearchInProgress />}
        <SearchList
          open={open}
          onSearch={onSearch}
          setMenu={setOpen}
          list={list}
          ref={menuRef}
        />
      </div>
    </>
  );
};

const SearchList = ({
  ref,
  list,
  onSearch,
  setMenu,
  open,
}: {
  ref: RefObject<HTMLUListElement>;
  list: [];
  onSearch: (city: string) => void;
  setMenu: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setSearching: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <ul
        data-state={open ? "open" : "closed"}
        ref={ref}
        className="data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 absolute top-28 left-0 flex w-full flex-col gap-1 rounded-lg bg-neutral-800 p-2 shadow-lg transition-all duration-200 data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:pointer-events-auto data-[state=open]:scale-100 data-[state=open]:opacity-100 lg:top-14"
      >
        {list.map((i, index) => (
          <SearchListItem
            onClick={onSearch}
            setMenu={setMenu}
            text={i}
            key={index}
          />
        ))}
      </ul>
    </>
  );
};

type SearchListitemProp = {
  text: string;
  onClick: (text: string) => void;
  setMenu: React.Dispatch<SetStateAction<boolean>>;
};

const SearchListItem = ({ text, onClick, setMenu }: SearchListitemProp) => {
  const handleClick = (text: string) => {
    onClick(text);
    setMenu(false);
  };
  return (
    <>
      <li>
        <button
          onClick={() => handleClick(text)}
          className="text-neutral-0 focus:outline-neutral-0 w-full cursor-pointer rounded-lg p-1 outline-neutral-600 hover:bg-neutral-700 hover:outline focus:outline focus:outline-offset-1 lg:px-2 lg:text-left"
        >
          {text}
        </button>
      </li>
    </>
  );
};

const SearchInProgress = () => {
  return (
    <>
      <div className="absolute top-14 left-0 flex w-full gap-3 rounded-lg bg-neutral-800 px-3 py-3 shadow-lg">
        <img src={loading} className="animate-spin" alt="loading" />
        <span className="text-neutral-0 font-DM-Sans text-base">
          Search in progress
        </span>
      </div>
    </>
  );
};

const SearchButton = () => {
  return (
    <>
      <button
        type="submit"
        className="font-DM-Sans text-neutral-0 w-11/12 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors hover:bg-blue-700 focus:outline-2 focus:outline-offset-[0.1875rem] focus:outline-blue-500 lg:w-3/12"
      >
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
  alt: string;
};

export const Main = ({
  loading,
  city,
  country,
  src,
  temperature,
  alt,
}: MainProps) => {
  return (
    <>
      <main
        className={`${loading ? "bg-neutral-800" : "bg-main-mobile lg:bg-main-desktop"} flex h-68 items-center justify-center rounded-3xl bg-cover bg-right bg-no-repeat lg:col-span-4 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:h-auto`}
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
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-2 lg:p-8">
            <div className="flex flex-col items-center lg:items-start">
              <h1 className="font-DM-Sans text-neutral-0 text-center text-2xl font-semibold lg:max-w-96 lg:text-start">
                {city}, {` `}
                {country}
              </h1>
              <span className="font-DM-Sans text-neutral-200">
                {`${new Date().toLocaleDateString("en-GB", { weekday: "long" })}, ${[new Date().toLocaleDateString("en-GB", { month: "short" })]}, ${new Date().getDate()}, ${new Date().getFullYear()}`}
              </span>
            </div>
            <div className="flex items-center gap-2 lg:gap-6">
              <img
                className="w-24 object-contain lg:w-28"
                src={src}
                alt={alt}
              />
              <span className="font-DM-Sans text-neutral-0 text-7xl font-bold italic">
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
  const displayUnit = unit === "kmh" ? "km/h" : unit;
  return (
    <li className="font-DM-Sans text-neutral-0 flex flex-col gap-4 rounded-xl border border-neutral-600 bg-neutral-800 px-4 py-3">
      <span className="text-neutral-200">{text}</span>
      <span
        className={`${
          loading ? "animate-pulse text-neutral-200" : "text-neutral-0"
        } text-3xl`}
      >
        {loading
          ? "_"
          : displayUnit === "%" || displayUnit === "°"
            ? `${value}${displayUnit}`
            : `${value} ${displayUnit}`}
      </span>
    </li>
  );
};

type WeeklyListProp = {
  data: [];
  loading: boolean;
};

export const WeeklyList = ({ data, loading }: WeeklyListProp) => {
  return (
    <>
      <section className="flex flex-col gap-2 lg:col-span-4 lg:row-span-2 lg:row-start-5 lg:gap-4">
        <span className="text-neutral-0 font-DM-Sans">Daily forecast</span>
        <ul className="grid grid-cols-3 gap-4 lg:h-full lg:grid-cols-7 lg:grid-rows-1">
          {loading
            ? Array.from({ length: 7 }).map((_, index) => (
                <WeeklyListItem key={index} loading={loading} />
              ))
            : data.map((i, index) => (
                <WeeklyListItem
                  key={index}
                  loading={loading}
                  day={i.day}
                  high={i.high}
                  low={i.low}
                  src={i.src}
                  alt={i.alt}
                />
              ))}
        </ul>
      </section>
    </>
  );
};

type WeeklyListItemProps =
  | { loading: true }
  | {
      loading: false;
      day: string;
      src: string;
      alt: string;
      high: number;
      low: number;
    };

const WeeklyListItem = (props: WeeklyListItemProps) => {
  if (props.loading) {
    return (
      <li className="flex h-44 flex-col items-center justify-between rounded-xl border border-neutral-600 bg-neutral-800 px-3 py-3 lg:h-full"></li>
    );
  }

  const { day, src, alt, high, low } = props;
  return (
    <>
      <li className="flex h-44 flex-col items-center justify-between rounded-xl border border-neutral-600 bg-neutral-800 px-3 py-3 lg:h-full">
        <>
          <span className="text-neutral-0 font-DM-Sans">{day}</span>
          <img className="w-20 object-contain" src={src} alt={alt} />
          <div className="flex w-full justify-between">
            <span className="text-neutral-0 font-DM-Sans">
              {high.toFixed(0)}°
            </span>
            <span className="font-DM-Sans text-neutral-200">
              {low.toFixed(0)}°
            </span>
          </div>
        </>
      </li>
    </>
  );
};

type HourlyListProp = {
  loading: boolean;
  day: string;
  setDay: React.Dispatch<SetStateAction<string>>;
  data: [];
  onClick: () => void;
  buttonRef: RefObject<HTMLButtonElement>;
  menuRef: RefObject<HTMLDivElement>;
};

export const HourlyList = ({
  loading,
  day,
  setDay,
  data,
  onClick,
  buttonRef,
  menuRef,
}: HourlyListProp) => {
  const [menu, setMenu] = useState(false);
  const timeRef = useRef<HTMLLIElement | null>(null);

  useClick({ open: menu, setOpen: setMenu, menuRef, buttonRef });

  const date = new Date();
  const currentTime = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;

  useEffect(() => {
    timeRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [loading, data]);

  return (
    <>
      <section className="flex max-h-[50rem] flex-col gap-4 overflow-hidden rounded-xl bg-neutral-800 lg:col-span-2 lg:col-start-5 lg:row-span-6 lg:row-start-1">
        <div className="relative flex items-center justify-between px-4 pt-4 lg:px-6 lg:pt-6">
          <span className="text-neutral-0 font-DM-Sans">Hourly forecast</span>
          <HourlyDropDown
            ref={buttonRef}
            text={day}
            loading={loading}
            open={menu}
            onClick={() => setMenu(!menu)}
          />
          <HourlyDropDownList
            open={menu}
            ref={menuRef}
            onClick={onClick}
            state={day}
            setMenu={setMenu}
            setState={setDay}
          />
        </div>
        <div className="scrollbar-thin scrollbar-thumb-neutral-700 max-h-[28rem] overflow-auto lg:max-h-[50rem]">
          <ul className="flex flex-col gap-4 pr-2 pb-4 pl-4 lg:pr-4 lg:pl-6">
            {loading
              ? Array.from({ length: 14 }).map((_, index) => (
                  <HourlyListItem key={index} loading={loading} />
                ))
              : data.map((i, index) => (
                  <HourlyListItem
                    ref={i.time === currentTime ? timeRef : null}
                    key={index}
                    alt={i.alt}
                    src={i.src}
                    time={i.time}
                    amPm={i.amPm}
                    temperature={i.temperature}
                    loading={loading}
                  />
                ))}
          </ul>
        </div>
      </section>
    </>
  );
};

type HourlyListItemProps =
  | { loading: true }
  | {
      src: string;
      alt: string;
      time: string;
      temperature: number;
      loading: false;
      amPm: string;
    };

const HourlyListItem = forwardRef<HTMLLIElement, HourlyListItemProps>(
  (props, ref) => {
    if (props.loading) {
      return (
        <li className="flex h-10 w-full animate-pulse items-center justify-between rounded-lg border border-neutral-600 bg-neutral-700 px-2 py-1"></li>
      );
    }

    const { src, alt, time, temperature, amPm } = props;
    return (
      <li
        ref={ref}
        className="flex w-full items-center justify-between rounded-lg border border-neutral-600 bg-neutral-700 px-2 py-1 lg:px-3 lg:py-2"
      >
        <div className="flex items-center gap-1">
          <img className="w-10 object-contain" src={src} alt={alt} />
          <span className="text-neutral-0 font-DM-Sans pt-1">
            {time} {amPm}
          </span>
        </div>
        <span className="font-DM-Sans text-neutral-200">
          {temperature.toFixed(0)}°
        </span>
      </li>
    );
  },
);

type HourlyDropDownProp = {
  loading: boolean;
  open: boolean;
  onClick: () => void;
  text: string;
  ref: RefObject<HTMLButtonElement>;
};

const HourlyDropDown = ({
  loading,
  open,
  onClick,
  text,
  ref,
}: HourlyDropDownProp) => {
  return (
    <>
      <nav>
        <button
          ref={ref}
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
  onClick: () => void;
  ref: RefObject<HTMLUListElement>;
  open: boolean;
};

const HourlyDropDownList = ({
  onClick,
  setState,
  setMenu,
  state,
  ref,
  open,
}: HourlyDropDownListProps) => {
  const handleClick = (text: string) => {
    onClick(text);
    setState(text);
    setMenu(false);
  };

  return (
    <>
      <ul
        data-state={open ? "open" : "closed"}
        ref={ref}
        className="font-DM-Sans data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 text-neutral-0 absolute inset-x-4 top-16 z-50 flex max-w-full flex-col gap-2 rounded-xl border border-neutral-600 bg-neutral-800 p-2 shadow-lg transition-all duration-200 data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:pointer-events-auto data-[state=open]:scale-100 data-[state=open]:opacity-100 lg:inset-x-auto lg:right-4 lg:left-auto lg:w-8/12"
      >
        {Array.from({ length: 7 }, (_, i) =>
          new Date(1970, 0, i + 5).toLocaleDateString("en-GB", {
            weekday: "long",
          }),
        ).map((i, index) => (
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

type ErrorProp = {
  onClick: () => void;
};

export const Error = ({ onClick }: ErrorProp) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000);
    onClick();
  };

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
        <button
          onClick={handleClick}
          className="text-neutral-0 font-DM-Sans group focus:outline-neutral-0 flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-800 px-4 py-1 transition-colors hover:bg-neutral-700 focus:outline-2 focus:outline-offset-[0.1875rem]"
        >
          <RefreshCw
            className={`${clicked ? "animate-spin" : "animate-none"} w-4 group-hover:animate-spin`}
          />
          Retry
        </button>
      </section>
    </>
  );
};

export const NoResults = () => {
  return (
    <>
      <span className="text-neutral-0 font-DM-Sans text-2xl font-bold lg:text-3xl">
        No search result found!
      </span>
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
