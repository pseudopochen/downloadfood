<template>
  <div class="shop-info">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="icon-delivery-icon">{{ info.description }}</span>
            <span
              >由商家配送提供配送，约{{ info.deliveryTime }}分钟送达，距离{{
                info.distance
              }}</span
            >
          </div>
          <div class="delivery-money">配送费￥{{ info.deliveryPrice }}</div>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div
            class="activity-item"
            v-for="(support, index) in info.supports"
            :key="index"
            :class="supportClasses[support.type]"
          >
            <span class="content-tag">
              <span class="mini-tag">{{ support.name }}</span>
            </span>
            <span class="activity-content">{{ support.content }}</span>
          </div>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="picsUl">
            <li class="pic-item" v-for="(pic, index) in info.pics" :key="index">
              <img width="120" height="90" :src="pic" />
            </li>
          </ul>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li>
            <span class="bold">品类</span> <span>{{ info.category }}</span>
          </li>
          <li>
            <span class="bold">商家电话</span> <span>{{ info.phone }}</span>
          </li>
          <li>
            <span class="bold">地址</span> <span>{{ info.address }}</span>
          </li>
          <li>
            <span class="bold">营业时间</span> <span>{{ info.workTime }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch, nextTick } from "vue";
import { useStore } from "vuex";
import BetterScroll from "better-scroll";

export default defineComponent({
  name: "ShopInfo",

  setup() {
    const store = useStore();
    const info = computed(() => store.state.info);
    const supportClasses = [
      "activity-green",
      "activity-red",
      "activity-orange",
    ];
    const picsUl = ref(null);

    function _initScroll() {
      new BetterScroll(".shop-info", {
        movable: true,
        zoom: true,
        click: true,
      }).refresh();

      const liWidth = 120;
      const space = 6;
      // console.log('info.value.pics.length: ', info.value.pics.length)
      const count = info.value.pics.length;
      picsUl.value.style.width = liWidth * count + space * (count - 1) + "px";
      // console.log('picsUl.value.style.width: ', picsUl.value.style.width)

      new BetterScroll(".pic-wrapper", {
        scrollX: true,
        movable: true,
      }).refresh();
    }

    onMounted(() => {
      if (!info.value.pics) {
        return;
      }
      _initScroll();
    });

    watch(info, async () => {
      await nextTick(); // must wait for nextTick(), otherwise won't work
      _initScroll();
    });

    return { info, supportClasses, picsUl };
  },
});
</script>

<style>
.shop-info {
  /* position: absolute; */
  /* top: 195px; */
  /* bottom: 0; */
  height: 500px;
  left: 0;
  width: 100%;
  background: #fff;
  overflow: hidden;
}

.shop-info .section {
  padding: 16px 14px 14px;
  font-size: 16px;
  background-color: #fff;
  color: #666;
  border-bottom: 1px solid #eee;
  position: relative;
}

.shop-info .section .section-title {
  color: #000;
  font-weight: 700;
  line-height: 16px;
}

.shop-info .section .section-title > .iconfont {
  float: right;
  color: #ccc;
}

.shop-info .section .delivery {
  margin-top: 16px;
  font-size: 13px;
  line-height: 18px;
}

.shop-info .section .delivery .icon-delivery-icon {
  width: 55px;
  font-size: 11px;
  margin-right: 10px;
  display: inline-block;
  text-align: center;
  color: #fff;
  background-color: #0097ff;
  padding: 1px 0;
  border-radius: 4px;
}

.shop-info .section .delivery .delivery-money {
  margin-top: 5px;
}

.shop-info .section .activity {
  margin-top: 16px;
}

.shop-info .section .activity .activity-item {
  margin-bottom: 12px;
  display: flex;
  font-size: 13px;
  align-items: center;
}

.shop-info .section .activity .activity-item.activity-green .content-tag {
  background-color: #70bc46;
}

.shop-info .section .activity .activity-item.activity-red .content-tag {
  background-color: #f07373;
}

.shop-info .section .activity .activity-item.activity-orange .content-tag {
  background-color: #f1884f;
}

.shop-info .section .activity .activity-item .content-tag {
  display: inline-block;
  border-radius: 2px;
  width: 36px;
  height: 18px;
  margin-right: 10px;
  color: #fff;
  font-style: normal;
  position: relative;
}

.shop-info .section .activity .activity-item .content-tag .mini-tag {
  position: absolute;
  left: 0;
  top: 0;
  right: -100%;
  bottom: -100%;
  font-size: 24px;
  transform: scale(0.5);
  transform-origin: 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shop-info .section .pic-wrapper {
  /* width: 100%; */
  width: 350px;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 16px;
}

.shop-info .section .pic-wrapper .pic-list {
  font-size: 0;
}

.shop-info .section .pic-wrapper .pic-list .pic-item {
  display: inline-block;
  margin-right: 6px;
  width: 120px;
  height: 90px;
}

.shop-info .section .pic-wrapper .pic-list .pic-item:last-child {
  margin: 0;
}

.shop-info .section .detail {
  margin-bottom: -16px;
}

.shop-info .section .detail > li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: -10px;
  padding: 16px 12px 16px 0;
  line-height: 16px;
  font-size: 13px;
}

.shop-info .section .detail > li > .bold {
  font-weight: 700;
  color: #333;
}

.shop-info .split {
  width: 100%;
  height: 16px;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  background: #f3f5f7;
}
</style>