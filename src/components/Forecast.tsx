import { WeatherData, getWeatherDescription } from '../utils/api';

interface ForecastProps {
    data: WeatherData;
}

export function Forecast({ data }: ForecastProps) {
    const { daily } = data;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    return (
        <div className="w-full h-full bg-black/20 rounded-2xl p-6 text-white border border-white/10">
            <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">5-Day Forecast</h3>
            <div className="space-y-3">
                {daily.time.slice(1, 6).map((time, index) => {
                    const code = daily.weather_code[index + 1];
                    const maxTemp = daily.temperature_2m_max[index + 1];
                    const minTemp = daily.temperature_2m_min[index + 1];
                    const description = getWeatherDescription(code);

                    return (
                        <div key={time} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-default">
                            <span className="w-10 font-medium opacity-90">{formatDate(time)}</span>
                            <div className="flex items-center flex-1 justify-center gap-2">
                                {/* Icon placeholder - could be mapped to real icons later */}
                                <span className="text-sm font-medium">{description.label}</span>
                            </div>
                            <div className="flex gap-3 w-24 justify-end">
                                <span className="font-bold">{Math.round(maxTemp)}°</span>
                                <span className="opacity-60">{Math.round(minTemp)}°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
