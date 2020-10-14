import { DailyWeather } from "../models/DailyWeather";
import needle, { NeedleResponse } from "needle";
import { WeatherCondition } from "../models/WeatherCondition";

export class OpenWeatherApiService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public static of(apiKey: string) {
    return new OpenWeatherApiService(apiKey);
  }

  async getWeatherForecastAsync(lat: number, lon: number): Promise<DailyWeather[]> {
    const openWeatherApiRequestUrl = this.getApiRequestUrl(lat, lon);

    const apiResponse: NeedleResponse = await needle("get", openWeatherApiRequestUrl);

    if (apiResponse && apiResponse.statusCode === 200) {
      const weatherForecast: DailyWeather[] = apiResponse.body.daily.map((day: { dt: number; temp: { day: number; }; weather: { id: number; }[]; }) => {
        const date: string = this.parseDateFromUnixDateTime(day.dt as number);
        const temperature: number = day.temp.day;
        const weatherCondition = this.parseWeatherConditionFromCode(day.weather[0].id as number);

        return DailyWeather.of(date, temperature, weatherCondition);
      });

      return weatherForecast;
    }

    return [];
  }

  private getApiRequestUrl(lat: number, lon: number) {
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=${this.apiKey}&exclude=minutely,hourly,alerts,current&units=metric`;
  }

  private parseDateFromUnixDateTime(unixTimeStamp: number) {
    const dtFormat = new Intl.DateTimeFormat('de-DE', { timeZone: 'UTC' });

    return dtFormat.format(unixTimeStamp * 1000);
  }

  private parseWeatherConditionFromCode(weatherCode: number) {
    if (weatherCode === 800) {
      return WeatherCondition.SUNNY;
    }

    const generalWeatherIndicator = Math.floor(weatherCode / 100);
    switch (generalWeatherIndicator) {
      case 2:
      case 3:
      case 5:
        return WeatherCondition.RAINY;
      case 6:
        return WeatherCondition.SNOWY;
      case 8:
        return WeatherCondition.CLOUDY;
    }
  }
}
