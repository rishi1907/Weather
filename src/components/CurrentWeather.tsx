import { WeatherData, getWeatherDescription } from '../utils/api';
import { Wind, Droplets, Thermometer } from 'lucide-react';

interface CurrentWeatherProps {
    data: WeatherData;
    city: string;
}

export function CurrentWeather({ data, city }: CurrentWeatherProps) {
    const { current } = data;
    const weatherInfo = getWeatherDescription(current.weather_code);

    return (
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white shadow-xl border border-white/20 mt-8">
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-semibold mb-2">{city}</h2>
                <div className="flex items-center justify-center my-4">
                    {/* In a real app, map icon string to actual Lucide icon component or image */}
                    <div className="text-6xl font-bold">{Math.round(current.temperature_2m)}°</div>
                </div>
                <p className="text-xl opacity-90 mb-6">{weatherInfo.label}</p>

                <div className="grid grid-cols-3 gap-4 w-full cursor-default">
                    <div className="flex flex-col items-center p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <Wind className="mb-1 w-5 h-5 opacity-70" />
                        <span className="text-sm opacity-70">Wind</span>
                        <span className="font-semibold">{current.wind_speed_10m} km/h</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <Droplets className="mb-1 w-5 h-5 opacity-70" />
                        <span className="text-sm opacity-70">Humidity</span>
                        <span className="font-semibold">{current.relative_humidity_2m}%</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <Thermometer className="mb-1 w-5 h-5 opacity-70" />
                        <span className="text-sm opacity-70">Feels Like</span>
                        <span className="font-semibold">{Math.round(current.apparent_temperature)}°</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
