import axios from "axios";
import { Request, Response } from "express";
import moment from "moment";
import { Between, FindOptionsWhere } from "typeorm";
import { appDataSource } from "../../../configuration/dataSource";
import { Indego } from "../entity/indego.entity";

export interface StationData {
  geometry: any;
  properties: {
    id: number;
    name: string;
    coordinates: number[];
    // Don't care about other properties
  };
}

const LAT = 39.952583;
const LNG = -75.165222;

const API_KEY = process.env["OPENWEATHER_API_KEY"];

export const saveIndegoDetails = async (data: StationData[]) => {
  Promise.all(
    data?.map(async (feature) => {
      const features = JSON.stringify(feature);
      const kioskId = feature?.properties?.id;
      const indegoData = {
        features,
        kioskId,
        timestamp: moment(new Date(Date.now()).setMinutes(0, 0, 0)).toDate(),
      };
      return appDataSource.getRepository(Indego).save(indegoData);
    })
  );
};

export const getStations = async (req: Request, res: Response) => {
  const at = req.query?.at?.toString();
  const date = moment(at);

  let where: FindOptionsWhere<Indego> = {};

  if (at) {
    where = {
      ...where,
      timestamp: Between(
        date.startOf("hour").toDate(),
        date.endOf("hour").toDate()
      ),
    };
  }

  const stations = await appDataSource.getRepository(Indego).find({ where });

  // const weatherResponse = await axios.get(
  //   `http://history.openweathermap.org/data/2.5/history/city?lat=${LAT}&lon=${LNG}&type=hour&start=${date.startOf(
  //     "hour"
  //   )}&end=${date.endOf("hour")}&appid=${API_KEY}`
  // );

  if (!stations) {
    res.json({
      at: req?.query?.at,
      stations: {},
    });
  }

  res.json({
    at,
    stations: stations.map((station) => {
      return { ...station, features: JSON.parse(station.features) };
    }),
    // weather: weatherResponse.data,
  });
};

export const getStationsByKioskId = async (req: Request, res: Response) => {
  const kioskId = parseInt(req.params["kioskId"]);
  const at = req.query?.at?.toString();
  const date = moment(at);

  let where: FindOptionsWhere<Indego> = { kioskId };
  if (at) {
    where = {
      ...where,
      timestamp: Between(
        date.startOf("hour").toDate(),
        date.endOf("hour").toDate()
      ),
    };
  }
  const stations = await appDataSource.getRepository(Indego).find({ where });

  // const weatherResponse = await axios.get(
  //   `http://history.openweathermap.org/data/2.5/history/city?lat=${LAT}&lon=${LNG}&type=hour&start=${date.startOf(
  //     "hour"
  //   )}&end=${date.endOf("hour")}&appid=${API_KEY}`
  // );

  if (!stations) {
    res.json({
      at: req?.query?.at,
      stations: {},
    });
  }

  res.json({
    at,
    stations: stations.map((station) => {
      return { ...station, features: JSON.parse(station.features) };
    }),
    // weather: weatherResponse.data,
  });
};
