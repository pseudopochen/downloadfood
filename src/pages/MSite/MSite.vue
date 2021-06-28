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
            
          </div>
        </div>
      </div>
    </nav>

    <div class="msite_shop_list">
      <div class="shop_header">
        <ion-icon name="reorder-three-outline"></ion-icon>
        <span class="shop_header_title">Nearby shops</span>
      </div>

      <ShopList/>

    </div>
  </section>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import Swiper from "swiper";
import "swiper/swiper.min.css";

import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ShopList from "../../components/ShopList/ShopList.vue"
export default defineComponent({
  name: "MSite",
  components: {
    HeaderTop,
    ShopList
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
  margin-top: 47px;
}
.msite img {
  width: 100px;
}
.msite a {
  text-decoration: none;
}
.msite_shop_list{
  margin-top: 5px;
}

</style>