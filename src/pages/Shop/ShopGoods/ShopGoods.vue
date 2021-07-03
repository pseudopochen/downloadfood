<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{ current: index === currentIndex }"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <ShopCart />
    </div>
    <Food :food="food" ref="foodRef" />
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  nextTick,
  ref,
  reactive,
} from "vue";
import { useStore } from "vuex";
import BetterScroll from "better-scroll";

import CartControl from "../../../components/CartControl/CartControl.vue";
import Food from "../../../components/Food/Food.vue";
import ShopCart from "../../../components/ShopCart/ShopCart.vue";

export default defineComponent({
  name: "ShopGoods",

  components: {
    CartControl,
    Food,
    ShopCart,
  },

  setup() {
    const store = useStore();

    const goods = computed(() => store.state.goods);

    const scrollY = ref(0);
    const tops = reactive([]);
    const currentIndex = computed(() => {
      const index = tops.findIndex((top, index) => {
        return scrollY.value >= top && scrollY.value < tops[index + 1];
      });
      return index;
    });

    let foodsScroll;
    const _initScroll = () => {
      new BetterScroll(".menu-wrapper", {
        movable: true,
        zoom: true,
        click: true,
      });

      foodsScroll = new BetterScroll(".foods-wrapper", {
        movable: true,
        zoom: true,
        click: true,
        probeType: 2,
      });

      foodsScroll.on("scroll", ({ y }) => {
        scrollY.value = Math.abs(y);
        // console.log(x, y, scrollY.value);
      });

      foodsScroll.on("scrollEnd", ({ y }) => {
        scrollY.value = Math.abs(y);
      });
    };

    const _initTops = () => {
      // const tops = [];
      let top = 0;
      tops.push(top);
      const lis = document.getElementsByClassName("food-list-hook");
      lis.forEach((li) => {
        top += li.clientHeight;
        tops.push(top);
      });
      // console.log("tops: ", tops);
    };

    onMounted(() => {
      store.dispatch("getShopGoods", async () => {
        await nextTick();
        _initScroll();
        _initTops();
      });
    });

    const clickMenuItem = (index) => {
      scrollY.value = tops[index];
      foodsScroll.scrollTo(0, -scrollY.value, 300);
    };

    let food = reactive({});
    const foodRef = ref(null);

    const showFood = (foodToShow) => {
      // do not use "=" for reassignment, https://stackoverflow.com/questions/65732144/vue-js-3-replace-update-reactive-object-without-losing-reactivity
      Object.assign(food, foodToShow);
      if (foodRef.value) {
        foodRef.value.toggleShow();
      }
    };

    return {
      goods,
      currentIndex,
      food,
      foodRef,
      clickMenuItem,
      showFood,
    };
  },
});
</script>

<style scoped>
.goods {
  display: flex;
  position: absolute;
  top: 40px;
  width: 100%;
  background: #fff;
  overflow: hidden;
}

.goods .menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  height: 430px;
  background: #f3f5f7;
  overflow: hidden;
}

.goods .menu-wrapper .menu-item {
  display: table;
  height: 54px;
  width: 72px;
  padding: 0 12px;
  line-height: 14px;
}

.goods .menu-wrapper .menu-item.current {
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  color: #02a774;
  font-weight: 700;
}

.goods .menu-wrapper .menu-item .icon {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}

.goods .menu-wrapper .menu-item .text {
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  position: relative;
  border: none;
  font-size: 12px;
}

.goods .menu-wrapper .menu-item .text:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(7, 17, 27, 0.1);
  transform: scaleY(0.5);
}

.goods .foods-wrapper {
  height: 430px;
  flex: 1;
}

.goods .foods-wrapper .title {
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: #93999f;
  background: #f3f5f7;
}

.goods .foods-wrapper .food-item {
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  position: relative;
  border: none;
}

.goods .foods-wrapper .food-item:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(7, 17, 27, 0.1);
  transform: scaleY(0.5);
}

.goods .foods-wrapper .food-item:last-child {
  margin-bottom: 0;
}

.goods .foods-wrapper .food-item .icon {
  flex: 0 0 57px;
  margin-right: 10px;
}

.goods .foods-wrapper .food-item .content {
  flex: 1;
  position: relative;
}

.goods .foods-wrapper .food-item .content .name {
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: #07111b;
}

.goods .foods-wrapper .food-item .content .desc,
.goods .foods-wrapper .food-item .content .extra {
  line-height: 10px;
  font-size: 10px;
  color: #93999f;
}

.goods .foods-wrapper .food-item .content .desc {
  line-height: 12px;
  margin-bottom: 8px;
}

.goods .foods-wrapper .food-item .content .extra .count {
  margin-right: 12px;
}

.goods .foods-wrapper .food-item .content .price {
  font-weight: 700;
  line-height: 24px;
}

.goods .foods-wrapper .food-item .content .price .now {
  margin-right: 8px;
  font-size: 14px;
  color: #f01414;
}

.goods .foods-wrapper .food-item .content .price .old {
  text-decoration: line-through;
  font-size: 10px;
  color: #93999f;
}

.goods .foods-wrapper .food-item .content .cartcontrol-wrapper {
  position: absolute;
  right: 0px;
  bottom: 0px;
}
</style>