import ajax from "./ajax.js";

const BASE_URL = "/api";

export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`);

export const reqFoodCategories = () => ajax(BASE_URL + "/index_category");

export const reqShops = (longitude, latitude) =>
  ajax(BASE_URL + "/shops", { longitude, latitude });

export const reqSearchShop = (geohash, keyword) =>
  ajax(BASE_URL + "/search_shops", { geohash, keyword });

export const reqPwdLogin = ({ name, pwd, captcha }) =>
  ajax(BASE_URL + "/login_pwd", { name, pwd, captcha }, "POST");

export const reqSendCode = (phone) => ajax(BASE_URL + "/sendcode", { phone });

export const reqSmsLogin = (phone, code) =>
  ajax(BASE_URL + "/login_sms", { phone, code }, "POST");

export const reqUserInfo = () => ajax(BASE_URL + "/userinfo");

export const reqLogout = () => ajax(BASE_URL + "/logout");

export const reqShopInfo = () => ajax("/info");

export const reqShopRatings = () => ajax("/ratings");

export const reqShopGoods = () => ajax("/goods");
