# Frontend Mentor - Weather app solution

This is my solution to the [Weather app challenge](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49) on Frontend Mentor Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

This is my entry to the Frontend Mentor 30 day Hackathon.

Challenge: [Challenge](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49)
Hackathon: [Hackathon](https://www.frontendmentor.io/articles/introducing-the-frontend-mentor-30-day-hackathon)

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Solution](https://github.com/jjdavenport/weather-app-main)
- Live Site URL: [Live site](https://jjdavenport.github.io/weather-app-main)

## My process

First step is too build the components and add necessary dependencies. Next I add the basic UI functionality which is basicly the drop down menus. Then its just a question of fetching from the open-meteo API and destructuring the data and mapping it on the various components.

### Built with

- Semantic HTML5 markup
- Flexbox
- CSS Grid for the daily list and desktop layout
- Mobile-first workflow
- [TypeScript](https://www.typescriptlang.org/) - Statically typed JavaScript
- [React](https://reactjs.org/) - JS library
- [tailwind css](https://tailwindcss.com/) - For styles
- [tailwind-scrollbar](https://github.com/adoxography/tailwind-scrollbar) - Hourly list scrollbar
- [lucide react](https://lucide.dev/) - Icons

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

How to handle default, loading and error states.

Learnt new methods to handle time and dates instead of using my own arrays of months and dates , I used built in methods to format the months and days.

From:

```tsx
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

{
  `${days[new Date().getDay()]}, ${months[new Date().getMonth()]}, ${new Date().getDate()}, ${new Date().getFullYear()}`;
}
```

To:

```tsx
{
  `${new Date().toLocaleDateString("en-GB", { weekday: "long" })}, ${[new Date().toLocaleDateString("en-GB", { month: "short" })]}, ${new Date().getDate()}, ${new Date().getFullYear()}`;
}
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

After completion of this challenge, I'm planning on learning how to use Figma, so the ui matches the specification exactly.

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

### Useful resources

- [Tailwind scrollbar docs](https://adoxography.github.io/tailwind-scrollbar/) - These docs helped me configure tailwind scrollbar as I was unfamiliar with how to get it setup or if it was compatible with tailwind V4
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Github - [jjdavenport](https://github.com/jjdavenport)
- Frontend Mentor - [@jjdavenport](https://www.frontendmentor.io/profile/jjdavenport)
