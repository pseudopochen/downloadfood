<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">Download Food</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
            >SMS Login</a
          >
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="loginWay = false"
            >Password Login</a
          >
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="phone number"
                v-model="phone"
              />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ right_phone: rightPhone }"
                @click.prevent="getCode"
              >
                {{
                  computeTime > 0
                    ? `code sent (${computeTime})`
                    : "get verification"
                }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="text"
                maxlength="8"
                placeholder="verification"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              Reminder: If you have not registered the phone number of the
              Download Food account, it will be automatically registered when
              you log in, and the
              <a href="javascript:;">User Agreement</a> is accepted.
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="phone/email/username"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="text"
                  maxlength="8"
                  placeholder="password"
                  v-if="showPwd"
                  v-model="pwd"
                />
                <input
                  type="password"
                  maxlength="8"
                  placeholder="password"
                  v-else
                  v-model="pwd"
                />
                <div
                  class="switch_button"
                  :class="showPwd ? 'on' : 'off'"
                  @click="showPwd = !showPwd"
                >
                  <div class="switch_circle" :class="{ right: showPwd }"></div>
                  <span class="switch_text">{{ showPwd ? "abc" : "..." }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="verification"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captchaRef"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">Login</button>
        </form>
        <a href="javascript:;" class="about_us">About Us</a>
      </div>
      <a href="javascript:;" class="go_back" @click="$router.back()">
        <i class="iconfont icon-chevronleft icon-jiantou2"></i>
        <!-- <ion-icon
          class="icon-jiantou2"
          size="large"
          name="chevron-back-outline"
        ></ion-icon> -->
      </a>
    </div>
    <AlertTip
      :alertText="alertText"
      v-show="showAlert"
      @closeTip="closeTip"
    ></AlertTip>
  </section>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import AlertTip from "../../components/AlertTip/AlertTip.vue";
import { reqSendCode, reqSmsLogin, reqPwdLogin } from "../../api/index.js";

export default defineComponent({
  name: "Login",
  components: {
    AlertTip,
  },
  setup() {
    const store = useStore();

    const loginWay = ref(true);
    const phone = ref("");
    const rightPhone = computed(() => {
      return /^1\d{10}$/.test(phone.value);
    });

    const computeTime = ref(0);
    const showPwd = ref(false);
    const pwd = ref("");
    const code = ref("");
    const name = ref("");
    const captcha = ref("");

    let timeIntervalId;
    const getCode = async () => {
      if (computeTime.value === 0) {
        computeTime.value = 30;
        timeIntervalId = setInterval(() => {
          computeTime.value--;
          if (computeTime.value === 0) {
            clearInterval(timeIntervalId);
          }
        }, 1000);

        const result = await reqSendCode(phone.value);
        if (result.code === 1) {
          showAlertBox(result.msg);
        }
        if (computeTime.value > 0) {
          computeTime.value = 0;
          clearInterval(timeIntervalId);
        }
      }
    };

    const alertText = ref("");
    const showAlert = ref(false);

    const showAlertBox = (alerttext) => {
      showAlert.value = true;
      alertText.value = alerttext;
    };

    async function login() {
      let result;

      if (loginWay.value) {
        if (!rightPhone.value) {
          showAlertBox("wrong phone number!");
          return;
        } else if (!/^\d{6}$/.test(code.value)) {
          showAlertBox("wrong verification code!");
          return;
        }
        result = await reqSmsLogin(phone.value, code.value);
      } else {
        if (!name.value) {
          showAlertBox("wrong user name!");
          return;
        } else if (!pwd.value) {
          showAlertBox("wrong password!");
          return;
        } else if (!captcha.value) {
          showAlertBox("wrong captcha!");
          return;
        }

        result = await reqPwdLogin({
          name: name.value,
          pwd: pwd.value,
          captcha: captcha.value,
        });
      }

      if (computeTime.value > 0) {
        computeTime.value = 0;
        clearInterval(timeIntervalId);
      }

      if (result.code === 0) {
        const user = result.data;
        store.dispatch("recordUser", user);
        this.$router.replace("/profile");
      } else {
        const msg = result.msg;
        showAlertBox(msg);
        this.getCaptcha();
        captcha.value = "";
      }
    }

    const closeTip = () => {
      showAlert.value = false;
      alertText.value = "";
    };

    function getCaptcha() {
      // console.log("getCaptcha--this: ", this);
      this.$refs.captchaRef.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    }

    return {
      loginWay,
      phone,
      rightPhone,
      computeTime,
      showPwd,
      pwd,
      code,
      name,
      captcha,
      alertText,
      showAlert,
      getCode,
      login,
      closeTip,
      getCaptcha,
    };
  },
});
</script>

<style>
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;
}

.loginContainer .loginInner {
  padding-top: 60px;
  width: 80%;
  margin: 0 auto;
}

.loginContainer .loginInner .login_header .login_logo {
  font-size: 40px;
  font-weight: bold;
  color: #02a774;
  text-align: center;
}

.loginContainer .loginInner .login_header .login_header_title {
  padding-top: 40px;
  text-align: center;
}

.loginContainer .loginInner .login_header .login_header_title > a {
  color: #333;
  font-size: 14px;
  padding-bottom: 4px;
}

.loginContainer .loginInner .login_header .login_header_title > a:first-child {
  margin-right: 40px;
}

.loginContainer .loginInner .login_header .login_header_title > a.on {
  color: #02a774;
  font-weight: 700;
  border-bottom: 2px solid #02a774;
}

.loginContainer .loginInner .login_content > form > div {
  display: none;
}

.loginContainer .loginInner .login_content > form > div.on {
  display: block;
}

.loginContainer .loginInner .login_content > form > div input {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: 0;
  font: 400 14px Arial;
}

.loginContainer .loginInner .login_content > form > div input:focus {
  border: 1px solid #02a774;
}

.loginContainer .loginInner .login_content > form > div .login_message {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}

.loginContainer
  .loginInner
  .login_content
  > form
  > div
  .login_message
  .get_verification {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: 0;
  color: #ccc;
  font-size: 14px;
  background: transparent;
}

.loginContainer
  .loginInner
  .login_content
  > form
  > div
  .login_message
  .get_verification.right_phone {
  color: #000;
}

.loginContainer .loginInner .login_content > form > div .login_verification {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}

.loginContainer
  .loginInner
  .login_content
  > form
  > div
  .login_verification
  .switch_button {
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: background-color 0.3s, border-color 0.3s;
  padding: 0 6px;
  width: 30px;
  height: 16px;
  line-height: 16px;
  color: #fff;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.loginContainer
  .loginInner
  .login_content
  > form
  > div
  .login_verification
  .switch_button.off {
  background: #fff;
}

.loginContainer
  .loginInner
  .login_content
  > form
  > div
  .login_verification
  .switch_button.off
  .switch_text {
  float: right;
  color: #ddd;
}

.loginContainer
  .loginInner
  .login_content
  > form
  > div
  .login_verification
  .switch_button.on {
  background: #02a774;
}

.loginContainer
  .loginInner
  .login_content
  > form
  > div
  .login_verification
  .switch_button
  > .switch_circle {
  position: absolute;
  top: -1px;
  left: -1px;
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.loginContainer
  .loginInner
  .login_content
  > form
  > div
  .login_verification
  .switch_button
  > .switch_circle.right {
  transform: translateX(30px);
}

.loginContainer .loginInner .login_content > form > div .login_hint {
  margin-top: 12px;
  color: #999;
  font-size: 14px;
  line-height: 20px;
}

.loginContainer .loginInner .login_content > form > div .login_hint > a {
  color: #02a774;
}

.loginContainer .loginInner .login_content > form .login_submit {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 30px;
  border-radius: 4px;
  background: #4cd96f;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
  border: 0;
}

.loginContainer .loginInner .login_content .about_us {
  display: block;
  font-size: 12px;
  margin-top: 20px;
  text-align: center;
  color: #999;
}

.loginContainer .loginInner .go_back {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 30px;
  height: 30px;
  text-decoration: none;
}

.loginContainer .loginInner .go_back > .icon-jiantou2 {
  font-size: 26px;
  color: #999;
}
</style>