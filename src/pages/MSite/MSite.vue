<template>
  <section class="msite">
    <HeaderTop :title="address.name">
      <template v-slot:left>
        <router-link class="header_search" to="/search">
          <ion-icon name="search"></ion-icon>
        </router-link>
      </template>
      <template v-slot:right>
        <router-link
          class="header_login"
          :to="userInfo._id ? '/userinfo' : '/login'"
        >
          <span class="header_login_text" v-if="!userInfo._id">Login</span>
          <span class="header_login_text" v-else
            ><ion-icon size="large" name="person"></ion-icon
          ></span>
        </router-link>
      </template>
    </HeaderTop>

    <nav class="msite_nav">
      <div class="swiper-container" v-if="categoriesArr.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(categories, index) in categoriesArr"
            :key="index"
          >
            <a
              href="javascript:;"
              class="link_to_food"
              v-for="(category, index) in categories"
              :key="index"
            >
              <div class="food_container">
                <img :src="baseImgURL + category.image_url" />
              </div>
              <span>{{ category.title }}</span>
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else />
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
import { defineComponent, onMounted, computed, watch, nextTick } from "vue";
import Swiper from "swiper/bundle"; // MUST use "swiper/bundle" (NOT "swiper") if need pagination
import "swiper/swiper-bundle.min.css"; // MUST use this style (NOT "swiper.min.css") if need pagination
import { useStore } from "vuex";

import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ShopList from "../../components/ShopList/ShopList.vue";

export default defineComponent({
  name: "MSite",
  components: {
    HeaderTop,
    ShopList,
  },
  setup() {
    const store = useStore();

    const userInfo = computed(() => store.state.userInfo);

    const address = computed(() => store.state.address);

    const categoriesArr = computed(() => {
      const { categories } = store.state;
      const numPerPage = 8;
      const arr = [];
      let idx = -1;
      for (let i = 0; i < categories.length; i++) {
        if (i % numPerPage === 0) {
          arr.push([]);
          idx++;
        }
        arr[idx].push(categories[i]);
      }

      return arr;
    });

    const baseImgURL = "https://fuss10.elemecdn.com";

    watch(categoriesArr, async () => {
      await nextTick();
      new Swiper(".swiper-container", {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
      });
    });

    onMounted(() => {
      store.dispatch("getCategories");
      store.dispatch("getShops");
    });

    return {
      userInfo,
      address,
      categoriesArr,
      baseImgURL,
    };
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