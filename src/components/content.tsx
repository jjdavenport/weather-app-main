import logo from "../assets/images/logo.svg";
import settings from "../assets/images/icon-units.svg";
import chevron from "../assets/images/icon-dropdown.svg";
import search from "../assets/images/icon-search.svg";

export const Footer = () => {
  return (
    <>
      <footer>
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.io/jjdavenport">jjdavenport</a>.
      </footer>
    </>
  );
};

export const Header = () => {
  return (
    <>
      <header>
        <img src={logo} alt="logo" />
        <HeaderDropdown />
      </header>
    </>
  );
};

const HeaderDropdown = () => {
  return (
    <div>
      <button>
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
    )
}

export const Title = () => {
  return (
    <>
      <h1>How's the sky looking today?</h1>
    </>
  );
};

export const Search = () => {
  return (
    <>
      <div>
        <img src={search} alt="search" />
        <input type="text" placeholder="Search for a place…" />
      </div>
    </>
  );
};

type SearchListProp = {
    unit: string;
}

const SearchList = ({unit}: SearchListProp) => {
    return (
        <>
        <ul>
            <button>Switch to {unit}</button>
            <SearchListItem label="Temperature" buttonOne="Celsius (°C)" buttonTwo="Fahrenheit (°F)"/>
            <SearchListItem label="Wind Speed" buttonOne="km/h" buttonTwo="mph"/>
            <SearchListItem label="Precipitation" buttonOne="Millimeters (mm)" buttonTwo="Inches (in)"/>
        </ul>
        </>
    )
}

type SearchListItemsProp = {
  label: string;
  buttonOne: string;
  buttonTwo: string;
}

const SearchListItem = ({label, buttonOne, buttonTwo}: SearchListItemsProp) => {
    return (
        <>
        <li>
        <label>{label}</label>
        <SearchListButton text={buttonOne}/>
        <SearchListButton text={buttonTwo}/>
        </li>
        </>
    )
}

type SearchListButtonProp = {
    text: string;
}

const SearchListButton = ({text}: SearchListButtonProp) => {
    return (
        <>
        <button>{text}</button>
        </>
    )
}

const SearchButton = () => [
    return (
        <>
        <li>
            <button></button>
        </li>
        </>
    )
]

const Button = () => {
  return (
    <>
      <button>Search</button>
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
      <ul>
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
      <li>
        <span>{text}</span>
        <span>{unit}</span>
      </li>
    </>
  );
};

export const DailyList = () => {
  return (
    <>
      <span>Daily forecast</span>
      <ul></ul>
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
      <ul>
        <div>
          <span>Hourly forecast</span>
          <HourlyDropDown />
        </div>
      </ul>
    </>
  );
};

type HourlyListItem = {
  src: string;
  alt: string;
  time: string;
  temp: string;
};

const HourlyListItem = ({ src, alt, time, temp }: HourlyListItem) => {
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
  return (
    <>
      <div>
        <button>
          {text} <img src={chevron} alt="chevron" />
        </button>
      </div>
    </>
  );
};
