<template>
  <HeaderTop title="Order List" />
  <section class="order_no_login">
    <img src="./images/person.png" />
    <h3>Check your order after login</h3>
    <button>Login</button>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default defineComponent({
  name: "Order",
  components: {
    HeaderTop,
  },
  setup() {},
});
</script>

<style>
.order_no_login {
  width: 100%;
  padding-top: 140px;
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
.order_no_login > img {
  display: block;
  width: 100%;
  height: 30%;
}
.order_no_login > h3 {
  padding: 10px 0;
  font-size: 17px;
  color: #6a6a6a;
}
.order_no_login > button {
  display: inline-block;
  background: #02a774;
  font-size: 14px;
  color: #fff;
  border: 0;
  outline: none;
  border-radius: 5px;
  padding: 10px 20px;
}
</style>