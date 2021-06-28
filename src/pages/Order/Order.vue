<template>
  <HeaderTop title="Order List"/>
  <section class="order_no_login">
    <img src="./images/person.png">
    <h3>Check your order after login</h3>
    <button>Login</button>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default defineComponent({

  name: 'Order',
  components: {
    HeaderTop
  },
  setup() {

  },
})
</script>

<style lang='stylus' rel='stylesheet/stylus'>

</style>