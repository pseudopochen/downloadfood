<template>
  <div>
    <ConfirmPopup></ConfirmPopup>
    <Toast position="top-center" />
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{ highlight: totalCount }">
              <i
                class="iconfont icon-Shoppingcart"
                :class="{ highlight: totalCount }"
              ></i>
            </div>
            <div class="num" v-if="totalCount">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{ highlight: totalCount }">
            ￥{{ totalPrice }}
          </div>
          <div class="desc">另需配送费￥{{ info.deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{ payText }}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, ref, watch } from "vue";
import { useStore } from "vuex";
import BetterScroll from "better-scroll";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import CartControl from "../CartControl/CartControl.vue";
export default defineComponent({
  name: "ShopCart",
  components: {
    CartControl,
  },

  setup() {
    const store = useStore();
    const info = computed(() => store.state.info);
    const totalCount = computed(() => store.getters["totalCount"]);
    const totalPrice = computed(() => store.getters["totalPrice"]);
    const payClass = computed(() => {
      const minPrice = info.value.minPrice;
      return totalPrice.value >= minPrice ? "enough" : "not-enough";
    });
    const payText = computed(() => {
      const minPrice = info.value.minPrice;
      if (totalPrice.value === 0) {
        return `min $${minPrice} to deliver`;
      } else if (totalPrice.value < minPrice) {
        return `add $${minPrice - totalPrice.value} to deliver`;
      } else {
        return "checkout";
      }
    });

    const cartFoods = computed(() => store.state.cartFoods);

    const listShow = ref(false);
    const toggleShow = () => {
      //   console.log("toggleShow");
      if (totalCount.value > 0) {
        listShow.value = !listShow.value;
      }
    };
    watch(totalCount, () => {
      if (totalCount.value === 0) {
        listShow.value = false;
      }
    });
    let bs = null;
    watch(listShow, async () => {
      if (listShow.value) {
        //   console.log('watch')
        await nextTick();
        if (!bs) {
          bs = new BetterScroll(".list-content", {
            click: true,
          });
        } else {
          bs.refresh();
        }
      }
    });

    const confirm = useConfirm(); // must call outside of the callback, otherwide: Uncaught Error: No PrimeVue Confirmation provided!
    const toast = useToast();
    const clearCart = (event) => {
      confirm.require({
        target: event.currentTarget,
        message: "Are you sure you want to clear cart?",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          toast.add({
            severity: "info",
            summary: "Confirmed",
            detail: "You have accepted",
            life: 3000,
          });
          store.dispatch("clearCart");
        },
        reject: () => {
          toast.add({
            severity: "error",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
          });
        },
      });
    };

    return {
      info,
      totalCount,
      totalPrice,
      payClass,
      payText,
      listShow,
      toggleShow,
      cartFoods,
      clearCart,
    };
  },
});
</script>

<style>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
}

.shopcart .content {
  display: flex;
  background: #141d27;
  font-size: 0;
  color: rgba(255, 255, 255, 0.4);
}

.shopcart .content .content-left {
  flex: 1;
}

.shopcart .content .content-left .logo-wrapper {
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: -10px;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  box-sizing: border-box;
  border-radius: 50%;
  background: #141d27;
}

.shopcart .content .content-left .logo-wrapper .logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  background: #2b343c;
}

.shopcart .content .content-left .logo-wrapper .logo.highlight {
  background: #02a774;
}

.shopcart .content .content-left .logo-wrapper .logo .icon-Shoppingcart {
  line-height: 44px;
  font-size: 24px;
  color: #80858a;
}

.shopcart
  .content
  .content-left
  .logo-wrapper
  .logo
  .icon-Shoppingcart.highlight {
  color: #fff;
}

.shopcart .content .content-left .logo-wrapper .num {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 16px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: #f01414;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}

.shopcart .content .content-left .price {
  display: inline-block;
  vertical-align: top;
  margin-top: 5px;
  line-height: 24px;
  padding-right: 12px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}

.shopcart .content .content-left .price.highlight {
  color: #fff;
}

.shopcart .content .content-left .desc {
  display: inline-block;
  vertical-align: bottom;
  margin-bottom: 1px;
  margin-left: -45px;
  font-size: 10px;
}

.shopcart .content .content-right {
  flex: 0 0 105px;
  width: 105px;
}

.shopcart .content .content-right .pay {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}

.shopcart .content .content-right .pay.not-enough {
  background: #2b333b;
}

.shopcart .content .content-right .pay.enough {
  background: #00b43c;
  color: #fff;
}

.shopcart .ball-container .ball {
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
  transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}

.shopcart .ball-container .ball .inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #02a774;
  transition: all 0.4s linear;
}

.shopcart .shopcart-list {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  transform: translateY(-100%);
}

.shopcart .shopcart-list.move-enter-active,
.shopcart .shopcart-list.move-leave-active {
  transition: transform 0.3s;
}

.shopcart .shopcart-list.move-enter,
.shopcart .shopcart-list.move-leave-to {
  transform: translateY(0);
}

.shopcart .shopcart-list .list-header {
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.shopcart .shopcart-list .list-header .title {
  float: left;
  font-size: 14px;
  color: #07111b;
}

.shopcart .shopcart-list .list-header .empty {
  float: right;
  font-size: 12px;
  color: #00a0dc;
}

.shopcart .shopcart-list .list-content {
  padding: 0 18px;
  max-height: 217px;
  height: 200px;
  overflow: hidden;
  background: #fff;
}

.shopcart .shopcart-list .list-content .food {
  position: relative;
  padding: 12px 0;
  box-sizing: border-box;
  position: relative;
  border: none;
}

.shopcart .shopcart-list .list-content .food:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(7, 17, 27, 0.1);
  transform: scaleY(0.5);
}

.shopcart .shopcart-list .list-content .food .name {
  line-height: 24px;
  font-size: 14px;
  color: #07111b;
}

.shopcart .shopcart-list .list-content .food .price {
  position: absolute;
  right: 90px;
  bottom: 22px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 700;
  color: #f01414;
}

.shopcart .shopcart-list .list-content .food .cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 0px;
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);
}

.list-mask.fade-enter-active,
.list-mask.fade-leave-active {
  transition: all 0.5s;
}

.list-mask.fade-enter,
.list-mask.fade-leave-to {
  opacity: 0;
  background: rgba(7, 17, 27, 0);
}
</style>