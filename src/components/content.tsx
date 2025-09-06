import logo from "../assets/images/logo.svg";
import settings from "../assets/images/icon-units.svg";
import chevron from "../assets/images/icon-dropdown.svg";
import search from "../assets/images/icon-search.svg";
import type React from "react";
import { useState } from "react";

type Prop = {
  children: React.ReactNode;
};

export const Wrapper = ({ children }: Prop) => {
  return (
    <>
      <div className="flex h-full min-h-screen w-full flex-col bg-neutral-900 text-lg">
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
  return (
    <>
      <header className="flex w-11/12 justify-between">
        <img className="object-contain" src={logo} alt="logo" />
        <HeaderDropdown />
      </header>
    </>
  );
};

const HeaderDropdown = () => {
  return (
    <div>
      <button className="font-DM-Sans text-neutral-0 flex gap-1 rounded-lg bg-neutral-700 px-2 py-1">
        <img src={settings} alt="settings" />
        Units <img src={chevron} alt="chevron" />
      </button>
    </div>
  );
};

const HeaderMenu = () => {
  return (
    <>
      <ul></ul>
    </>
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

export const Search = () => {
  return (
    <>
      <div className="flex w-11/12 gap-4 rounded-lg bg-neutral-700 px-4 py-2">
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

type SearchListProp = {
  unit: string;
};

const SearchList = ({ unit }: SearchListProp) => {
  return (
    <>
      <ul>
        <button>Switch to {unit}</button>
        <SearchListItem
          label="Temperature"
          buttonOne="Celsius (°C)"
          buttonTwo="Fahrenheit (°F)"
        />
        <SearchListItem label="Wind Speed" buttonOne="km/h" buttonTwo="mph" />
        <SearchListItem
          label="Precipitation"
          buttonOne="Millimeters (mm)"
          buttonTwo="Inches (in)"
        />
      </ul>
    </>
  );
};

type SearchListItemsProp = {
  label: string;
  buttonOne: string;
  buttonTwo: string;
};

const SearchListItem = ({
  label,
  buttonOne,
  buttonTwo,
}: SearchListItemsProp) => {
  return (
    <>
      <li>
        <label>{label}</label>
        <SearchListButton text={buttonOne} />
        <SearchListButton text={buttonTwo} />
      </li>
    </>
  );
};

type SearchListButtonProp = {
  text: string;
};

const SearchListButton = ({ text }: SearchListButtonProp) => {
  return (
    <>
      <button>{text}</button>
    </>
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

export const Main = () => {
  return (
    <>
      <main></main>
    </>
  );
};

export const List = () => {
  return (
    <>
      <ul className="grid w-11/12 grid-cols-2 grid-rows-2 gap-4">
        <ListItem text="Feels like" />
        <ListItem text="Humidity" />
        <ListItem text="Wind" />
        <ListItem text="Precipitation" />
      </ul>
    </>
  );
};

type ListItemProps = {
  text: string;
  unit: string;
};

const ListItem = ({ text, unit }: ListItemProps) => {
  return (
    <>
      <li className="font-DM-Sans text-neutral-0 rounded-lg border border-neutral-600 bg-neutral-700 p-4">
        <span>{text}</span>
        <span>{unit}</span>
      </li>
    </>
  );
};

export const DailyList = () => {
  return (
    <>
      <section className="w-11/12">
        <span className="text-neutral-0 font-DM-Sans">Daily forecast</span>
        <ul className="grid grid-cols-2 grid-rows-3"></ul>
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
      <li>
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

export const HourlyList = () => {
  return (
    <>
      <section className="w-11/12 rounded-lg bg-neutral-700 p-4">
        <div className="flex justify-between">
          <span className="text-neutral-0 font-DM-Sans">Hourly forecast</span>
          <HourlyDropDown />
        </div>
        <ul></ul>
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
      <li>
        <div>
          <img src={src} alt={alt} />
          <span>{time}</span>
        </div>
        <span>{temp}</span>
      </li>
    </>
  );
};

const HourlyDropDown = () => {
  const [text, setText] = useState("Tuesday");
  return (
    <>
      <div>
        <button className="font-DM-Sans text-neutral-0 flex gap-2 rounded-lg bg-neutral-600 px-2 py-1">
          {text} <img src={chevron} alt="chevron" />
        </button>
      </div>
    </>
  );
};
