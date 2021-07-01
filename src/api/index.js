import ajax from "./ajax.js";

const BASE_URL = "/api";

export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`);

export const reqFoodCategories = () => ajax(BASE_URL + "/index_category");

export const reqShops = (longitude, latitude) =>
  ajax(BASE_URL + "/shops", { longitude, latitude });
