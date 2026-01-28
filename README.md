# Weather Dashboard

A real-time weather dashboard built with React and Vite. Search any city worldwide to see current conditions and a 3-day forecast.

![Weather Dashboard](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple)

## Features

- **Live Weather Data** - Fetches real-time data from wttr.in API (no API key required)
- **City Search** - Search for any city worldwide
- **Current Conditions** - Temperature, feels like, humidity, wind speed, UV index
- **3-Day Forecast** - High/low temps and chance of rain
- **Auto-Refresh** - Updates every 60 seconds
- **Responsive Design** - Works on desktop and mobile
- **Animated UI** - Glassmorphism design with smooth hover effects

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/austin-reece-gladly/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## Usage

1. The dashboard loads with San Francisco weather by default
2. Type any city name in the search box and click "Search"
3. View current conditions in the main card
4. Check the detail cards for humidity, wind, and UV index
5. Scroll down to see the 3-day forecast

## How It Works

### Architecture

```
src/
├── App.jsx      # Main component with all logic
├── App.css      # Styling with glassmorphism effects
├── main.jsx     # React entry point
└── index.css    # Base styles
```

### Data Flow

1. On load, `fetchWeather()` is called with the default city
2. The app fetches JSON data from `wttr.in/{city}?format=j1`
3. Response is parsed into `weather` (current) and `forecast` (3-day) state
4. A `setInterval` refreshes data every 60 seconds
5. Searching a new city updates the `city` state, triggering a new fetch

### API

This app uses [wttr.in](https://wttr.in), a free weather service that requires no API key. The JSON endpoint returns:

- Current temperature, humidity, wind, UV index
- 3-day forecast with hourly breakdowns
- Location details (nearest area, region)

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready for deployment.

## License

MIT
