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
        <div className="w-full flex flex-col items-center justify-center p-6 text-white text-center">
            <h2 className="text-2xl font-medium opacity-90 mb-1">{city}</h2>
            <p className="text-sm opacity-70 mb-6">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>

            <div className="flex flex-col items-center my-2">
                {/* Large Temperature */}
                <div className="text-8xl font-thin tracking-tighter">
                    {Math.round(current.temperature_2m)}°
                </div>
                <p className="text-2xl font-medium mt-2">{weatherInfo.label}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full mt-8">
                <div className="flex flex-col items-center p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <Wind className="mb-2 w-6 h-6 opacity-80" />
                    <span className="text-xs opacity-70 uppercase tracking-wider">Wind</span>
                    <span className="font-semibold text-lg">{current.wind_speed_10m} <span className="text-xs font-normal opacity-70">km/h</span></span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <Droplets className="mb-2 w-6 h-6 opacity-80" />
                    <span className="text-xs opacity-70 uppercase tracking-wider">Humidity</span>
                    <span className="font-semibold text-lg">{current.relative_humidity_2m}<span className="text-xs font-normal opacity-70">%</span></span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <Thermometer className="mb-2 w-6 h-6 opacity-80" />
                    <span className="text-xs opacity-70 uppercase tracking-wider">Feels Like</span>
                    <span className="font-semibold text-lg">{Math.round(current.apparent_temperature)}°</span>
                </div>
            </div>
        </div>
    );
}
