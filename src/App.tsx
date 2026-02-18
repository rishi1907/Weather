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
        // Main Container with Background Image
        <div
            className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-cover bg-center bg-no-repeat transition-all duration-700"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop")', // Scenic nature background
                backgroundColor: '#0f172a' // Fallback color
            }}
        >
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>

            {/* Glassmorphism Card */}
            <div className="relative z-10 w-full max-w-4xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-md overflow-hidden flex flex-col items-center p-6 sm:p-10">

                <header className="mb-8 flex items-center gap-3">
                    <CloudSun className="w-10 h-10 text-white drop-shadow-lg" />
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md">Weather App</h1>
                </header>

                <SearchBar onSearch={handleSearch} isLoading={loading} />

                {error && (
                    <div className="mt-8 bg-red-500/20 text-red-100 px-6 py-3 rounded-xl border border-red-500/30">
                        {error}
                    </div>
                )}

                {loading && !weather && (
                    <div className="mt-20 flex flex-col items-center">
                        <Loader2 className="w-12 h-12 animate-spin text-white/80" />
                        <p className="mt-4 text-white/80 font-medium">Loading weather data...</p>
                    </div>
                )}

                {!loading && weather && (
                    <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                        <div className="flex justify-center">
                            <CurrentWeather data={weather} city={city} />
                        </div>
                        <div className="flex justify-center">
                            <Forecast data={weather} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
