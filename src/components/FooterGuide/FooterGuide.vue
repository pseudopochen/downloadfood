<template>
  <div class="footer_guide">
    <a
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/msite' === $route.path }"
      @click="goTo('/msite')"
    >
      <span class="item_icon">
        <ion-icon name="fast-food"></ion-icon>
      </span>
      <span>Delivery</span>
    </a>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/search' === $route.path }"
      @click="goTo('/search')"
    >
      <span class="item_icon">
        <ion-icon name="search"></ion-icon>
      </span>
      <span>Search</span>
    </a>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/order' === $route.path }"
      @click="goTo('/order')"
    >
      <span class="item_icon">
        <ion-icon name="notifications"></ion-icon>
      </span>
      <span>Order</span>
    </a>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/profile' === $route.path }"
      @click="goTo('/profile')"
    >
      <span class="item_icon">
        <ion-icon name="person"></ion-icon>
      </span>
      <span>Profile</span>
    </a>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "FooterGuide",

  setup() {
    function goTo(path) {
      this.$router.replace(path);
    }
    return { goTo };
  },
});
</script>

<style scoped>
.footer_guide::before {
  content: "";
  position: absolute;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
}

.footer_guide {
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  padding: 5px;
}
.footer_guide .guide_item {
  display: flex;
  flex: 1;
  text-align: center;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  color: #999999;
}

.footer_guide .on {
  color: #02a774;
}

.footer_guide .guide_item .item_icon ion-icon {
  font-size: 28px;
}

.footer_guide .guide_item span {
  font-size: 14px;
}

a:link {
  text-decoration: none;
}
</style>