import { createRouter, createWebHistory } from "vue-router";
// import MSite from "../pages/MSite/MSite.vue";
// import Search from "../pages/Search/Search.vue";
// import Order from "../pages/Order/Order.vue";
// import Profile from "../pages/Profile/Profile.vue";

// component lazy load
const MSite = () => import("../pages/MSite/MSite.vue");
const Search = () => import("../pages/Search/Search.vue");
const Order = () => import("../pages/Order/Order.vue");
const Profile = () => import("../pages/Profile/Profile.vue");

import Login from "../pages/Login/Login.vue";
import Shop from "../pages/Shop/Shop.vue";
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods.vue";
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings.vue";
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo.vue";

const routes = [
  {
    path: "/msite",
    name: "MSite",
    component: MSite,
    meta: { showFooter: true },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: { showFooter: true },
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
    meta: { showFooter: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { showFooter: true },
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/", redirect: "/msite" },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
    children: [
      { path: "/shop/goods", component: ShopGoods },
      { path: "/shop/ratings", component: ShopRatings },
      { path: "/shop/info", component: ShopInfo },
      { path: "", redirect: "/shop/goods" },
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
