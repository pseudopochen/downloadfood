<template>
  <header class="header">
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">
        {{ title }}
      </span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderTop",
  props: {
    title: String,
  },
});
</script>

<style>
.header {
  background-color: #02a774;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.header .header_search {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 10%;
  height: 50%;
}

.header .header_title {
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  color: #fff;
  display: flex;
  flex: 1;
}

.header .header_login {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  height: 50%;
  color: #fff;
  display: flex;
  flex: 1;
}

.header ion-icon {
  color: #fff;
  size: 24px;
}
</style>