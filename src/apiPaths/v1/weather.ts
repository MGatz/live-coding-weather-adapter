import { Request, Response } from "express";
import { Operation } from "express-openapi";
import { OpenWeatherApiService } from "../../services/OpenWeatherApiService";

const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
const openWeatherApiService = OpenWeatherApiService.of(openWeatherApiKey);

export const GET: Operation = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  const latAsNumber = parseFloat(lat as string);
  const lonAsNumber = parseFloat(lon as string);

  const dailyWeatherForecast = await openWeatherApiService.getWeatherForecastAsync(latAsNumber, lonAsNumber);

  res.json(dailyWeatherForecast);
}

GET.apiDoc = {
  description: 'Get weather forecast for location by geographical coordinates.',
  operationId: 'getByCoordinates',
  parameters: [{
    in: 'query',
    name: 'lat',
    required: true,
    type: 'number'
  }, {
    in: 'query',
    name: 'lon',
    required: true,
    type: 'number'
  }],
  responses: {
    200: {
      description: 'The weather forecast',
      schema: {
        type: 'array',
        items: {
          $ref: '#/definitions/DailyWeather'
        }
      }
    }
  }
}
