<template>
  <section class="loginContainer">
      <div class="loginInner">
          <div class="login_header"></div>
          <div class="login_content"></div>
          <a href="javascript:;" class="go_back" @click="$router.back()">
              <ion-icon name="arrow-back-outline"></ion-icon>
          </a>
      </div>
      

  </section>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({

  name: 'Login',

  setup() {

  },
})
</script>

<style>

</style>