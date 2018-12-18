import request from "request-promise";
import dotenv from "dotenv";

dotenv.config();

export const getPlaces = async (query: string) => {
  const key = process.env.OPEN_CAGE_DATA_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${query}&key=${key}&limit=20&no_annotations=1`;
  const response = await request(url);
  return JSON.parse(response);
};
