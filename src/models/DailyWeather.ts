import { WeatherCondition } from "./WeatherCondition";

export class DailyWeather {
  readonly date: string;
  readonly temperature: number;
  readonly weatherCondition: WeatherCondition;

  constructor(date: string, temperature: number, weatherCondition: WeatherCondition) {
    this.date = date;
    this.temperature = temperature;
    this.weatherCondition = weatherCondition;
  }

  public static of(date: string, temperature: number, weatherCondition: WeatherCondition) {
    return new DailyWeather(date, temperature, weatherCondition);
  }
}
