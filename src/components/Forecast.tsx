import { WeatherData, getWeatherDescription } from '../utils/api';

interface ForecastProps {
    data: WeatherData;
}

export function Forecast({ data }: ForecastProps) {
    const { daily } = data;

    // Helper to format date
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    return (
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-white shadow-xl border border-white/20 mt-6">
            <h3 className="text-xl font-semibold mb-4 px-2">5-Day Forecast</h3>
            <div className="space-y-4">
                {daily.time.slice(1, 6).map((time, index) => {
                    // slice(1, 6) to get next 5 days, skipping today
                    // daily arrays map 1:1 by index
                    const code = daily.weather_code[index + 1];
                    const maxTemp = daily.temperature_2m_max[index + 1];
                    const minTemp = daily.temperature_2m_min[index + 1];
                    const description = getWeatherDescription(code);

                    return (
                        <div key={time} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-default">
                            <span className="w-12 font-medium">{formatDate(time)}</span>
                            <div className="flex items-center flex-1 justify-center gap-2">
                                {/* Icon placeholder */}
                                <span className="text-sm opacity-80">{description.label}</span>
                            </div>
                            <div className="flex gap-4 w-20 justify-end">
                                <span className="font-medium">{Math.round(maxTemp)}°</span>
                                <span className="opacity-60">{Math.round(minTemp)}°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
