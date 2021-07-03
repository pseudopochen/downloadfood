<template>
  <ShopHeader />
  <div class="tab">
    <div class="tab-item">
      <router-link to="/shop/goods">Order</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/shop/ratings">Rating</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/shop/info">Info</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import ShopHeader from "../../components/ShopHeader/ShopHeader.vue";
export default defineComponent({
  name: "Shop",
  components: {
    ShopHeader,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("getShopInfo");
    });
  },
});
</script>

<style scoped>
.tab {
  height: 40px;
  line-height: 40px;
  background: #fff;
  position: relative;
  border: none;
}

.tab:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(7, 17, 27, 0.1);
  transform: scaleY(0.5);
}

.tab .tab-item {
  float: left;
  width: 33.33333%;
  text-align: center;
  font-size: 14px;
  color: #4d555d;
}

.tab .tab-item a {
  display: block;
  position: relative;
  text-decoration: none;
}
.tab .tab-item a:visited {
  color: #4d555d;
}

.tab .tab-item a.router-link-active {
  color: #02a774;
}

.tab .tab-item a.router-link-active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 1px;
  width: 35px;
  height: 2px;
  transform: translateX(-50%);
  background: #02a774;
}
</style>