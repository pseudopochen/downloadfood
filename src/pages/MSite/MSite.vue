<template>
  <section class="msite">
    <HeaderTop title="North Springfield Westlake Sunset">
      <template v-slot:left>
        <span class="header_search">
          <ion-icon name="search"></ion-icon>
        </span>
      </template>
      <template v-slot:right>
        <span class="header_login">
          <span class="header_login_text"> Login </span>
        </span>
      </template>
    </HeaderTop>

    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a href="javascript:;" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/1.jpg" />
              </div>
              <span>Deserts</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/2.jpg" />
              </div>
              <span>Groceries</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/3.jpg" />
              </div>
              <span>Meals</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/4.jpg" />
              </div>
              <span>Snacks</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/5.jpg" />
              </div>
              <span>Promos</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/6.jpg" />
              </div>
              <span>Delivery</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/7.jpg" />
              </div>
              <span>Breakfast</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/8.jpg" />
              </div>
              <span>Recommend</span>
            </a>
          </div>
          <div class="swiper-slide">
            <a href="javascript:;" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/9.jpg" />
              </div>
              <span>Deserts</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/10.jpg" />
              </div>
              <span>Groceries</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/11.jpg" />
              </div>
              <span>Meals</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/12.jpg" />
              </div>
              <span>Snacks</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/13.jpg" />
              </div>
              <span>Promos</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/14.jpg" />
              </div>
              <span>Delivery</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/1.jpg" />
              </div>
              <span>Breakfast</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/2.jpg" />
              </div>
              <span>Recommend</span>
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>

    <div class="msite_shop_list">
      <div class="shop_header">
        <ion-icon size="large" name="reorder-three-outline"></ion-icon>
        <span class="shop_header_title">Nearby Shops</span>
      </div>

      <ShopList />
    </div>
  </section>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import Swiper from "swiper/bundle"; // MUST use "swiper/bundle" (NOT "swiper") if need pagination
import "swiper/swiper-bundle.min.css"; // MUST use this style (NOT "swiper.min.css") if need pagination

import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ShopList from "../../components/ShopList/ShopList.vue";

export default defineComponent({
  name: "MSite",
  components: {
    HeaderTop,
    ShopList,
  },
  setup() {
    onMounted(() => {
      new Swiper(".swiper-container", {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
      });
    });
  },
});
</script>

<style>
.msite {
  width: 100%;
}
.msite .msite_nav {
  margin-top: 45px;
  height: 200px;
  background: #fff;
}
.msite .msite_nav .swiper-container {
  width: 100%;
  height: 100%;
}
.msite .msite_nav .swiper-container .swiper-wrapper {
  width: 100%;
  height: 100%;
}
.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
.msite
  .msite_nav
  .swiper-container
  .swiper-wrapper
  .swiper-slide
  .link_to_food {
  width: 25%;
}
.msite
  .msite_nav
  .swiper-container
  .swiper-wrapper
  .swiper-slide
  .link_to_food
  .food_container {
  display: block;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  font-size: 0;
}
.msite
  .msite_nav
  .swiper-container
  .swiper-wrapper
  .swiper-slide
  .link_to_food
  .food_container
  img {
  display: inline-block;
  width: 50px;
  height: 50px;
}
.msite
  .msite_nav
  .swiper-container
  .swiper-wrapper
  .swiper-slide
  .link_to_food
  span {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #666;
}

.swiper-pagination > span.swiper-pagination-bullet-active {
  background: #02a774;
}

.msite_shop_list {
  position: relative;
  margin-top: 10px;
  background: #fff;
}
.msite_shop_list::before {
  content: "";
  position: absolute;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
}
.msite_shop_list .shop_header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 10px 0;
}
.msite_shop_list .shop_header ion-icon {
  margin-left: 5px;
  color: #999;
}

.msite_shop_list .shop_header .shop_header_title {
  color: #999;
  /* font-size: 14px; */
  /* line-height: 20px; */
  margin-top: 3px;
}
</style>