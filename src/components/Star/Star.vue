<template>
  <div class="star" :class="'star-' + size">
    <span
      class="star-item"
      v-for="(sc, index) in starClasses"
      :class="sc"
      :key="index"
    ></span>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Star",
  props: {
    score: Number,
    size: Number,
  },
  setup(props) {
    const starClasses = computed(() => {
      const { score } = props;
      const scs = [];
      for (let i = 0; i < parseInt(score); i++) {
        scs.push("on");
      }
      if (score - parseInt(score) >= 0.5) {
        scs.push("half");
      }

      for (let i = 0, l = scs.length; i < 5 - l; i++) {
        // MUST get the length of scs before looping, otherwise the length increases during looping
        scs.push("off");
      }
      return scs;
    });

    return {
      starClasses,
    };
  },
});
</script>

<style>
.star {
  float: left;
  font-size: 0;
}

.star .star-item {
  display: inline-block;
  background-repeat: no-repeat;
}

.star.star-48 .star-item {
  width: 20px;
  height: 20px;
  margin-right: 22px;
  background-size: 20px 20px;
}

.star.star-48 .star-item:last-child {
  margin-right: 0;
}

.star.star-48 .star-item.on {
  background-image: url("./images/star48_on@2x.png");
}

@media (-webket-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-48 .star-item.on {
    background-image: url("./images/star48_on@3x.png");
  }
}

.star.star-48 .star-item.half {
  background-image: url("./images/star48_half@2x.png");
}

@media (-webket-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-48 .star-item.half {
    background-image: url("./images/star48_half@3x.png");
  }
}

.star.star-48 .star-item.off {
  background-image: url("./images/star48_off@2x.png");
}

@media (-webket-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-48 .star-item.off {
    background-image: url("./images/star48_off@3x.png");
  }
}

.star.star-36 .star-item {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  background-size: 15px 15px;
}

.star.star-36 .star-item:last-child {
  margin-right: 0;
}

.star.star-36 .star-item.on {
  background-image: url("./images/star36_on@2x.png");
}

@media (-webket-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-36 .star-item.on {
    background-image: url("./images/star36_on@3x.png");
  }
}

.star.star-36 .star-item.half {
  background-image: url("./images/star36_half@2x.png");
}

@media (-webket-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-36 .star-item.half {
    background-image: url("./images/star36_half@3x.png");
  }
}

.star.star-36 .star-item.off {
  background-image: url("./images/star36_off@2x.png");
}

@media (-webket-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-36 .star-item.off {
    background-image: url("./images/star36_off@3x.png");
  }
}

.star.star-24 .star-item {
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-size: 10px 10px;
}

.star.star-24 .star-item:last-child {
  margin-right: 0;
}

.star.star-24 .star-item.on {
  background-image: url("./images/star24_on@2x.png");
}

@media (-webket-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-24 .star-item.on {
    background-image: url("./images/star24_on@3x.png");
  }
}

.star.star-24 .star-item.half {
  background-image: url("./images/star24_half@2x.png");
}

@media (-webket-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-24 .star-item.half {
    background-image: url("./images/star24_half@3x.png");
  }
}

.star.star-24 .star-item.off {
  background-image: url("./images/star24_off@2x.png");
}

@media (-webket-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-24 .star-item.off {
    background-image: url("./images/star24_off@3x.png");
  }
}
</style>