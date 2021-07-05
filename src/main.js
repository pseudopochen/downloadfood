import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmPopup from "primevue/confirmpopup";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import VueLazyLoad from "vue3-lazyload";
import loading from "./common/imgs/loading.gif";
import "./mock/mockServer";

createApp(App)
  .use(router)
  .use(store)
  .use(PrimeVue)
  .use(ToastService)
  .use(ConfirmationService)
  .use(VueLazyLoad, { loading })
  .component("Button", Button)
  .component("Toast", Toast)
  .component("ConfirmPopup", ConfirmPopup)
  .mount("#app");
