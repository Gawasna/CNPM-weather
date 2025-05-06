# Weatherio React App

This is a conversion of a plain HTML, CSS, and JavaScript weather application into a React application using Vite. It utilizes the OpenWeather API to display current weather, air quality, and forecast information.

## Tech Stack

**Client:** React, JavaScript, HTML, CSS, Vite, React Router DOM, OpenWeather API

## Features

- Display current weather for a location (temperature, description, icon, date, location name).
- Show today's highlights (Air Quality Index, Sunrise & Sunset, Humidity, Pressure, Visibility, Feels Like).
- Display hourly forecast data (24-hour outlook).
- Display 5-day forecast data.
- Search for weather in different cities with type-ahead suggestions (debounced).
- Get weather for the current location (if permitted by the browser).
- Responsive design adapting from the original project.
- Loading spinner while fetching data.
- Basic error handling and 404 page.

## Project Structure
Use code with caution.
Markdown
my-weather-app/
├── public/ # Static assets (images, fonts, favicon)
│ ├── assets/
│ │ ├── font/
│ │ ├── images/ # Includes weather_icons and other images
│ │ └── Thumbs.db (optional)
│ └── favicon.svg
├── src/ # Source code
│ ├── components/ # Reusable React components
│ │ ├── CurrentWeather.jsx
│ │ ├── ErrorPage.jsx
│ │ ├── Forecast5Days.jsx
│ │ ├── Footer.jsx
│ │ ├── Header.jsx
│ │ ├── Highlights.jsx
│ │ ├── HourlyForecast.jsx
│ │ ├── Layout.jsx # Main layout and data fetching logic
│ │ └── LoadingSpinner.jsx
│ ├── utils/ # Utility functions (API calls, weather formatting)
│ │ ├── api.js
│ │ └── weatherUtils.js
│ ├── App.jsx # Main App component and routing
│ ├── style.css # Project-wide CSS styles
│ └── main.jsx # Entry point for React application
├── .env # Environment variables (API key)
├── .gitignore # Specifies intentionally untracked files (like .env)
├── index.html # Main HTML file (managed by Vite)
├── package.json # Project dependencies and scripts
└── README.md # This file
## Run Locally

1.  **Clone or download the project files:**
    ```bash
      git clone <link-to-this-repo> # Replace with the actual repo link
    ```
2.  **Go to the project directory:**
    ```bash
      cd my-weather-app # Or the name you chose
    ```
3.  **Install Dependencies:**
    ```bash
      npm install # Or yarn install or pnpm install
    ```
4.  **Set up Environment Variables:**
    *   Obtain an API key from OpenWeatherMap (https://openweathermap.org/api). You'll need an API key for current weather, forecast, and air pollution data.
    *   Create a file named `.env` in the **root** of the project directory (`my-weather-app/.env`).
    *   Add your API key in the format:
        ```env
        VITE_API_KEY=YOUR_OPENWEATHER_API_KEY
        ```
        Replace `YOUR_OPENWEATHER_API_KEY` with your actual key.
    *   **Important:** Ensure `.env` is listed in your `.gitignore` file to prevent committing your key. Vite's default `.gitignore` usually handles this.

5.  **Start the Development Server:**
    ```bash
      npm run dev # Or yarn dev or pnpm dev
    ```
    The application will typically open in your browser at `http://localhost:5173` (or another port Vite assigns). The application uses hash-based routing (e.g., `http://localhost:5173/#/current-location`).

## Building for Production

To create a production build of the application:

**Instructions for the User to Run the Project:**

1.  **Download the Code:** Provide a link or instruction to get the complete code base (e.g., clone from a repository).
2.  **Place Files:** Instruct the user to place the files into a directory named `my-weather-app`. The directory structure provided in the README.md should be the target.
3.  **Install Dependencies:** Guide them to open a terminal in the project root and run `npm install` (or `yarn install`, `pnpm install`).
4.  **Get API Key:** Explain that an OpenWeather API key is required and where to get it.
5.  **Create `.env`:** Explain how to create the `.env` file in the root and add the `VITE_API_KEY`. Emphasize keeping this file secret.
6.  **Start Server:** Instruct them to run `npm run dev` to start the development server.
7.  **Access App:** Tell them to open their browser to the specified local address (usually `http://localhost:5173`).
