<template>
  <section class="profile">
    <HeaderTop title="My Info" />
    <section class="profile-number">
      <router-link to="/login" class="profile-link">
        <div class="profile_image">
          <ion-icon name="person"></ion-icon>
        </div>
        <div class="user-info">
          <p class="user-info-top">Login/Register</p>
          <p>
            <span class="user-icon">
              <ion-icon name="phone-portrait"></ion-icon>
            </span>
            <span class="icon-mobile-number">No phone number</span>
          </p>
        </div>
        <span class="arrow">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </span>
      </router-link>
    </section>

    <section class="profile_info_data border-1px"></section>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default defineComponent({
  name: "Profile",
  components: {
    HeaderTop,
  },
  setup() {},
});
</script>

<style>
.profile-number {
  margin-top: 50px;
}
</style>