<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="iconfont icon-remove_circle_outline"
        v-if="food.count"
        @click.stop="updateFoodCount(false)"
      ></div>
    </transition>

    <div class="cart-count" v-if="food.count">{{ food.count }}</div>

    <div
      class="iconfont icon-icon-addcircle-fill"
      @click.stop="updateFoodCount(true)"
    ></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "CartControl",
  props: {
    food: Object,
  },
  setup(props) {
    const store = useStore();
    const updateFoodCount = (isAdd) => {
      store.dispatch("updateFoodCount", { isAdd, food: props.food });
    };
    return { updateFoodCount };
  },
});
</script>

<style>
.cartcontrol {
  font-size: 10;
}

.cartcontrol .cart-decrease {
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: #00a0dc;
}

.cartcontrol .icon-remove_circle_outline {
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: #02a774;
}

.cartcontrol .icon-remove_circle_outline.move-enter-active,
.cartcontrol .icon-remove_circle_outline.move-leave-active {
  transition: all 0.3s;
}

.cartcontrol .icon-remove_circle_outline.move-enter,
.cartcontrol .icon-remove_circle_outline.move-leave-to {
  opacity: 0;
  transform: translateX(15px) rotate(180deg);
}

.cartcontrol .cart-count {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  padding-top: 6px;
  line-height: 24px;
  text-align: center;
  font-size: 10px;
  color: #93999f;
}

.cartcontrol .icon-icon-addcircle-fill {
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: #02a774;
}
</style>