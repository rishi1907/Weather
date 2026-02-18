import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { getWeather, getCoordinates, WeatherData } from './utils/api';
import { CloudSun, Loader2 } from 'lucide-react';

function App() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [city, setCity] = useState<string>('London');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (searchCity: string) => {
        setLoading(true);
        setError(null);
        try {
            const coords = await getCoordinates(searchCity);
            if (coords.length === 0) {
                setError('City not found');
                setLoading(false);
                return;
            }

            const { latitude, longitude, name, country } = coords[0];
            const data = await getWeather(latitude, longitude);
            setWeather(data);
            setCity(`${name}, ${country}`);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather('London');
    }, []);

    const handleSearch = (query: string) => {
        fetchWeather(query);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center py-12 px-4 text-white font-sans transition-colors duration-500">
            <header className="mb-8 flex items-center gap-3">
                <CloudSun className="w-10 h-10" />
                <h1 className="text-4xl font-bold tracking-tight">Weather App</h1>
            </header>

            <SearchBar onSearch={handleSearch} isLoading={loading} />

            {error && (
                <div className="mt-8 bg-red-500/20 text-red-100 px-6 py-3 rounded-xl border border-red-500/30">
                    {error}
                </div>
            )}

            {loading && !weather && (
                <div className="mt-20 flex flex-col items-center">
                    <Loader2 className="w-10 h-10 animate-spin opacity-70" />
                    <p className="mt-4 opacity-70">Loading weather data...</p>
                </div>
            )}

            {!loading && weather && (
                <>
                    <CurrentWeather data={weather} city={city} />
                    <Forecast data={weather} />
                </>
            )}
        </div>
    );
}

export default App;
