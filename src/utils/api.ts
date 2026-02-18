export interface WeatherData {
    current: {
        temperature_2m: number;
        relative_humidity_2m: number;
        apparent_temperature: number;
        weather_code: number;
        wind_speed_10m: number;
    };
    daily: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    };
}

export interface GeocodingResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
}

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function getCoordinates(city: string): Promise<GeocodingResult[]> {
    const response = await fetch(
        `${GEOCODING_API_URL}?name=${encodeURIComponent(city)}&count=5&language=en&format=json`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch coordinates");
    }
    const data = await response.json();
    return data.results || [];
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
    const response = await fetch(
        `${WEATHER_API_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=auto`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
}

// Function to map WMO weather codes to readable descriptions/icons
export function getWeatherDescription(code: number): { label: string; icon: string } {
    // WMO Weather interpretation codes (WMO-4677)
    const map: Record<number, { label: string; icon: string }> = {
        0: { label: "Clear sky", icon: "sun" },
        1: { label: "Mainly clear", icon: "cloud-sun" },
        2: { label: "Partly cloudy", icon: "cloud-sun" },
        3: { label: "Overcast", icon: "cloud" },
        45: { label: "Fog", icon: "cloud-fog" },
        48: { label: "Fog", icon: "cloud-fog" },
        51: { label: "Drizzle", icon: "cloud-drizzle" },
        53: { label: "Drizzle", icon: "cloud-drizzle" },
        55: { label: "Drizzle", icon: "cloud-drizzle" },
        61: { label: "Rain", icon: "cloud-rain" },
        63: { label: "Rain", icon: "cloud-rain" },
        65: { label: "Heavy Rain", icon: "cloud-rain" },
        71: { label: "Snow", icon: "snowflake" },
        73: { label: "Snow", icon: "snowflake" },
        75: { label: "Heavy Snow", icon: "snowflake" },
        80: { label: "Rain Showers", icon: "cloud-rain" },
        81: { label: "Rain Showers", icon: "cloud-rain" },
        82: { label: "Rain Showers", icon: "cloud-rain" },
        95: { label: "Thunderstorm", icon: "cloud-lightning" },
        96: { label: "Thunderstorm", icon: "cloud-lightning" },
        99: { label: "Thunderstorm", icon: "cloud-lightning" },
    };

    return map[code] || { label: "Unknown", icon: "help-circle" };
}
