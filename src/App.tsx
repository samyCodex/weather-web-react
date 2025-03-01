import { useState } from "react";
import axios from "axios";

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    condition: {
      text: string;
      icon: string;
    };
    temp_c: number;
    feelslike_c: number;
    wind_kph: number;
    humidity: number;
  };
}

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://weather-kfmtok34k-samycode3s-projects.vercel.app/api/weather?city=${city}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 p-5">
      <div className="w-full max-w-lg p-6 bg-white bg-opacity-20 rounded-xl shadow-lg backdrop-blur-md text-center">
        <h1 className="text-3xl font-bold text-white">Weather App</h1>
        <input
          type="text"
          placeholder="Enter city..."
          className="mt-4 p-3 w-full rounded-md text-black"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="mt-3 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
        >
          Search
        </button>

        {loading && <p className="text-white mt-4">Loading...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {weather && (
          <div className="mt-6 text-white">
            <h2 className="text-2xl font-bold">
              {weather.location.name}, {weather.location.country}
            </h2>
            <p className="text-lg">{weather.current.condition.text}</p>
            <img
              src={weather.current.condition.icon}
              alt="weather icon"
              className="mx-auto"
            />
            <p className="text-4xl font-bold">{weather.current.temp_c}°C</p>
            <p>Feels like: {weather.current.feelslike_c}°C</p>
            <p>Wind: {weather.current.wind_kph} kph</p>
            <p>Humidity: {weather.current.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
