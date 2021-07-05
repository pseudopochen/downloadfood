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
}

.header .header_search {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 10%;
  height: 50%;
  text-decoration: none;
}

.header .header_search .icon-search {
  font-size: 25px;
  color: #fff;
}

.header .header_title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  color: #fff;
  text-align: center;
}

.header .header_title .header_title_text {
  font-size: 18px;
  color: #fff;
  display: block;
}

.header .header_login {
  color: #fff;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  text-decoration: none;
  font-size: 16px;
}

.header .header_login .header_login_text {
  color: #fff;
}
</style>