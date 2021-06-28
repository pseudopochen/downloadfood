<template>
  <div id="app">
    <router-view />
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
export default defineComponent({
  name: "App",
  components: {
    FooterGuide,
  },

  setup() {},
});
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>