
import { AQIData } from "../types";

const API_KEY = 'd3fb7125-2d24-4fb6-94c6-c5d04774be11';
const CACHE_KEY = 'tozamap_aqi_data_v2'; // Changed key to force refresh
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const getTashkentAQI = async (): Promise<AQIData | null> => {
  try {
    // 1. Check Cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const data: AQIData = JSON.parse(cached);
        const age = Date.now() - data.timestamp;
        
        if (age < CACHE_DURATION) {
          console.log("Using cached AQI data");
          return data;
        }
      } catch (e) {
        localStorage.removeItem(CACHE_KEY);
      }
    }

    // 2. Fetch fresh data
    console.log("Fetching fresh AQI data...");
    
    // Using Coordinates for Tashkent (More robust than string matching)
    // 41.311081, 69.240562
    const url = `https://api.airvisual.com/v2/nearest_city?lat=41.311081&lon=69.240562&key=${API_KEY}`;
    
    const response = await fetch(url);
    const json = await response.json();

    if (json.status === "success") {
      const current = json.data.current;
      
      const aqiData: AQIData = {
        aqi: current.pollution.aqius,
        temperature: current.weather.tp,
        humidity: current.weather.hu,
        city: 'Tashkent', // Enforce display name
        icon: current.weather.ic,
        timestamp: Date.now()
      };

      // 3. Save to Cache
      localStorage.setItem(CACHE_KEY, JSON.stringify(aqiData));
      return aqiData;
    } else {
      console.warn("IQAir API Error:", json.data?.message || json.status);
      return null;
    }

  } catch (error) {
    console.error("Failed to fetch AQI:", error);
    return null;
  }
};

export const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return 'bg-emerald-500'; // Good
  if (aqi <= 100) return 'bg-yellow-500'; // Moderate
  if (aqi <= 150) return 'bg-orange-500'; // Unhealthy for Sensitive
  if (aqi <= 200) return 'bg-red-500';    // Unhealthy
  if (aqi <= 300) return 'bg-purple-500'; // Very Unhealthy
  return 'bg-red-900';                    // Hazardous
};

export const getAQIStatusKey = (aqi: number): string => {
  if (aqi <= 50) return 'aqi.good';
  if (aqi <= 100) return 'aqi.moderate';
  if (aqi <= 150) return 'aqi.sensitive';
  if (aqi <= 200) return 'aqi.unhealthy';
  return 'aqi.hazardous';
};
