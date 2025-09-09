import logo from "../assets/images/logo.svg";
import settings from "../assets/images/icon-units.svg";
import chevron from "../assets/images/icon-dropdown.svg";
import search from "../assets/images/icon-search.svg";
import cross from "../assets/images/icon-error.svg";
import reload from "../assets/images/icon-loading.svg";
import tick from "../assets/images/icon-checkmark.svg";
import type React from "react";
import { useState, type SetStateAction } from "react";

type Prop = {
  children: React.ReactNode;
};

export const Wrapper = ({ children }: Prop) => {
  return (
    <>
      <div className="flex h-full min-h-screen w-full flex-col gap-4 bg-neutral-900 text-lg">
        {children}
      </div>
    </>
  );
};

export const Container = ({ children }: Prop) => {
  return (
    <>
      <div className="flex flex-1 flex-col items-center gap-4 pt-4">
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
        <a className="underline" href="https://github.io/jjdavenport">
          jjdavenport
        </a>
        .
      </footer>
    </>
  );
};

export const Header = () => {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <header className="relative flex w-11/12 justify-between">
        <img className="object-contain" src={logo} alt="logo" />
        <HeaderDropdown onClick={() => setMenu(!menu)} />
        {menu && <HeaderMenu unit="imperial" />}
      </header>
    </>
  );
};

type HeaderDropdownProp = {
  onClick: () => void;
};

const HeaderDropdown = ({ onClick }: HeaderDropdownProp) => {
  return (
    <nav>
      <button
        onClick={onClick}
        className="font-DM-Sans text-neutral-0 flex cursor-pointer gap-2 rounded-lg bg-neutral-700 px-3 py-1"
      >
        <img className="object-contain" src={settings} alt="settings" />
        Units <img className="object-contain" src={chevron} alt="chevron" />
      </button>
    </nav>
  );
};

export const Title = () => {
  return (
    <>
      <h1 className="font-DM-Sans text-neutral-0 w-11/12 text-center text-6xl font-bold">
        How's the sky looking today?
      </h1>
    </>
  );
};

type HeaderMenuProp = {
  unit: string;
};

const HeaderMenu = ({ unit }: HeaderMenuProp) => {
  const [selected, setSelected] = useState({
    temperature: "Celsius (°C)",
    wind: "km/h",
    precipitation: "Millimeters (mm)",
  });
  return (
    <>
      <div className="absolute top-12 flex w-full flex-col gap-2 rounded-lg border border-neutral-600 bg-neutral-800 p-2 shadow-lg">
        <button className="text-neutral-0 p-1 text-left">
          Switch to {unit}
        </button>
        <div className="flex flex-col divide-y divide-neutral-600">
          <HeaderListItem
            setButton={(value) =>
              setSelected((prev) => ({ ...prev, temperature: value }))
            }
            selected={selected.temperature}
            label="Temperature"
            buttonOne="Celsius (°C)"
            buttonTwo="Fahrenheit (°F)"
          />
          <HeaderListItem
            setButton={(value) =>
              setSelected((prev) => ({ ...prev, wind: value }))
            }
            selected={selected.wind}
            label="Wind Speed"
            buttonOne="km/h"
            buttonTwo="mph"
          />
          <HeaderListItem
            setButton={(value) =>
              setSelected((prev) => ({
                ...prev,
                precipitation: value,
              }))
            }
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

export const Search = () => {
  return (
    <>
      <div className="flex w-11/12 gap-4 rounded-lg bg-neutral-800 px-4 py-2">
        <img src={search} alt="search" />
        <input
          className="font-DM-Sans w-full placeholder:text-neutral-200 focus:outline-none"
          type="text"
          placeholder="Search for a place…"
        />
      </div>
    </>
  );
};

const SearchList = () => {
  return <></>;
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
      <li className="flex flex-col">
        <label className="p-1 text-neutral-200">{label}</label>
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
      className={`${selected === text ? "bg-neutral-700" : "bg-transparent"} text-neutral-0 flex cursor-pointer justify-between rounded-lg p-1 text-left`}
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

export const SearchButton = () => {
  return (
    <>
      <li>
        <button></button>
      </li>
    </>
  );
};

export const Button = () => {
  return (
    <>
      <button className="font-DM-Sans text-neutral-0 w-11/12 rounded-lg bg-blue-500 p-2">
        Search
      </button>
    </>
  );
};

type MainProp = {
  loading: boolean;
};

export const Main = ({ loading }: MainProp) => {
  return (
    <>
      <main className="flex w-11/12 items-center justify-center rounded-lg bg-neutral-800 p-1">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-DM-Sans text-neutral-0">
              .<span className="">.</span>.
            </span>
            <span className="font-DM-Sans text-neutral-0">Loading…</span>
          </div>
        )}
      </main>
    </>
  );
};

type ListProp = {
  loading: boolean;
};

export const List = ({ loading }: ListProp) => {
  return (
    <>
      <ul className="grid w-11/12 grid-cols-2 grid-rows-2 gap-4">
        <ListItem loading={loading} text="Feels like" />
        <ListItem loading={loading} text="Humidity" />
        <ListItem loading={loading} text="Wind" />
        <ListItem loading={loading} text="Precipitation" />
      </ul>
    </>
  );
};

type ListItemProps = {
  text: string;
  unit: string;
  loading: boolean;
};

const ListItem = ({ text, unit, loading }: ListItemProps) => {
  return (
    <>
      <li className="font-DM-Sans text-neutral-0 flex flex-col gap-1 rounded-lg border border-neutral-600 bg-neutral-800 p-4">
        <span>{text}</span>
        <span>{loading ? unit : "_"}</span>
      </li>
    </>
  );
};

export const DailyList = () => {
  return (
    <>
      <section className="flex w-11/12 flex-col gap-2">
        <span className="text-neutral-0 font-DM-Sans">Daily forecast</span>
        <ul className="grid grid-cols-2 grid-rows-3 gap-4">
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
      <li className="rounded-lg border border-neutral-600 bg-neutral-700 p-16">
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
};

export const HourlyList = ({ loading }: HourlyListProp) => {
  const [menu, setMenu] = useState(false);
  const [state, setState] = useState("Tuesday");
  return (
    <>
      <section className="relative flex w-11/12 flex-col gap-4 rounded-lg bg-neutral-800 p-4">
        <div className="flex justify-between">
          <span className="text-neutral-0 font-DM-Sans">Hourly forecast</span>
          <HourlyDropDown
            text={state}
            loading={loading}
            menu={menu}
            setMenu={setMenu}
          />
        </div>
        <ul className="flex flex-col gap-4">
          <HourlyListItem />
          <HourlyListItem />
          <HourlyListItem />
          <HourlyListItem />
          <HourlyListItem />
          <HourlyListItem />
          <HourlyListItem />
          <HourlyListItem />
        </ul>
        {menu && (
          <HourlyDropDownList
            state={state}
            setMenu={setMenu}
            setState={setState}
          />
        )}
      </section>
    </>
  );
};

type HourlyListItemProps = {
  src: string;
  alt: string;
  time: string;
  temp: string;
};

const HourlyListItem = ({ src, alt, time, temp }: HourlyListItemProps) => {
  return (
    <>
      <li className="h-10 w-full rounded-lg border border-neutral-600 bg-neutral-700">
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
  menu: boolean;
  setMenu: React.Dispatch<SetStateAction<boolean>>;
  text: string;
};

const HourlyDropDown = ({
  loading,
  menu,
  setMenu,
  text,
}: HourlyDropDownProp) => {
  return (
    <>
      <nav>
        <button
          onClick={() => setMenu(!menu)}
          className="font-DM-Sans text-neutral-0 flex cursor-pointer gap-2 rounded-lg bg-neutral-600 px-2 py-1"
        >
          {loading ? "-" : text} <img src={chevron} alt="chevron" />
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
      <ul className="font-DM-Sans text-neutral-0 absolute top-14 left-0 w-full rounded-lg border border-neutral-600 bg-neutral-800 p-2 shadow-lg">
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
          className={`${state === text ? "bg-neutral-700" : "bg-transparent"} w-full cursor-pointer rounded-lg`}
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
      <section>
        <img src={cross} alt="error" />
        <span>Something went wrong</span>
        <p>
          We couldn't connect server (API error).Please try again in a few
          moments.
        </p>
        <button>
          <img src={reload} alt="reload" />
          Retry
        </button>
      </section>
    </>
  );
};

export const NoResult = () => {
  return (
    <>
      <span>No search result found!</span>
    </>
  );
};
