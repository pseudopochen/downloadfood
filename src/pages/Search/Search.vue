<template>
  <section class="search">
    <HeaderTop title="Search"/>
    <form class="search_form" action="#">
      <input type="search" name="search" placeholder="enter food name" />
      <input type="submit" name="submit" class="search_submit" />
    </form>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default defineComponent({
  name: "Search",
  components: {
    HeaderTop
  },
  setup() {},
});
</script>

<style ></style>