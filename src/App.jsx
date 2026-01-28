import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [city, setCity] = useState('San Francisco')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchWeather = async (location) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://wttr.in/${encodeURIComponent(location)}?format=j1`
      )
      if (!response.ok) throw new Error('City not found')
      const data = await response.json()

      setWeather({
        temp: data.current_condition[0].temp_F,
        tempC: data.current_condition[0].temp_C,
        condition: data.current_condition[0].weatherDesc[0].value,
        humidity: data.current_condition[0].humidity,
        wind: data.current_condition[0].windspeedMph,
        feelsLike: data.current_condition[0].FeelsLikeF,
        uv: data.current_condition[0].uvIndex,
        visibility: data.current_condition[0].visibility,
        location: data.nearest_area[0].areaName[0].value,
        region: data.nearest_area[0].region[0].value,
      })

      setForecast(data.weather.slice(0, 3).map(day => ({
        date: day.date,
        maxTemp: day.maxtempF,
        minTemp: day.mintempF,
        condition: day.hourly[4].weatherDesc[0].value,
        chanceOfRain: day.hourly[4].chanceofrain,
      })))

      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)
    const interval = setInterval(() => fetchWeather(city), 60000)
    return () => clearInterval(interval)
  }, [city])

  const handleSearch = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    setCity(formData.get('city'))
  }

  const getWeatherIcon = (condition) => {
    const c = condition.toLowerCase()
    if (c.includes('sun') || c.includes('clear')) return '☀️'
    if (c.includes('cloud') || c.includes('overcast')) return '☁️'
    if (c.includes('rain') || c.includes('drizzle')) return '🌧️'
    if (c.includes('snow')) return '❄️'
    if (c.includes('thunder') || c.includes('storm')) return '⛈️'
    if (c.includes('fog') || c.includes('mist')) return '🌫️'
    if (c.includes('partly')) return '⛅'
    return '🌤️'
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  return (
    <div className="app">
      <header>
        <h1>🌤️ Weather Dashboard</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            name="city"
            placeholder="Enter city name..."
            defaultValue={city}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      {loading && <div className="loading">Loading weather data...</div>}

      {error && <div className="error">❌ {error}</div>}

      {weather && !loading && (
        <main>
          <section className="current-weather">
            <div className="weather-icon">{getWeatherIcon(weather.condition)}</div>
            <div className="weather-info">
              <h2>{weather.location}, {weather.region}</h2>
              <div className="temperature">{weather.temp}°F</div>
              <div className="condition">{weather.condition}</div>
            </div>
          </section>

          <section className="weather-details">
            <div className="detail-card">
              <span className="label">Feels Like</span>
              <span className="value">{weather.feelsLike}°F</span>
            </div>
            <div className="detail-card">
              <span className="label">Humidity</span>
              <span className="value">{weather.humidity}%</span>
            </div>
            <div className="detail-card">
              <span className="label">Wind</span>
              <span className="value">{weather.wind} mph</span>
            </div>
            <div className="detail-card">
              <span className="label">UV Index</span>
              <span className="value">{weather.uv}</span>
            </div>
          </section>

          <section className="forecast">
            <h3>3-Day Forecast</h3>
            <div className="forecast-cards">
              {forecast.map((day, i) => (
                <div key={i} className="forecast-card">
                  <div className="forecast-date">{formatDate(day.date)}</div>
                  <div className="forecast-icon">{getWeatherIcon(day.condition)}</div>
                  <div className="forecast-temps">
                    <span className="high">{day.maxTemp}°</span>
                    <span className="low">{day.minTemp}°</span>
                  </div>
                  <div className="forecast-rain">💧 {day.chanceOfRain}%</div>
                </div>
              ))}
            </div>
          </section>

          {lastUpdated && (
            <footer className="last-updated">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </footer>
          )}
        </main>
      )}
    </div>
  )
}

export default App
