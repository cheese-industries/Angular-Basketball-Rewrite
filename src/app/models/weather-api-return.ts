export type WeatherAPIReturn = Root2[]

export interface Root2 {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_weather: CurrentWeather
  hourly_units: HourlyUnits
  hourly: Hourly
  gamePk?: number
  hour?: number
  currentConditions?: any
  windDirection?: any
  windDirectionText?: any
}

export interface CurrentWeather {
  currentConditions?: string
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  is_day: number
  time: string
  windDirectionText?: any
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  windspeed_10m: string
  winddirection_10m: string
  precipitation_probability: string
  cloudcover: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  windspeed_10m: number[]
  winddirection_10m: number[]
  precipitation_probability: number[]
  cloudcover: number[]
}
