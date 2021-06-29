<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">Download Food</h2>
        <div class="login_header_title">
          <a href="javascript:;" class="on">message login</a>
          <a href="javascript:;">password login</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div class="on">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="phone number" />
              <button disabled="disabled" class="get_verification">
                get verification
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="verification" />
            </section>
            <section class="login_hint">
              Reminder: If you have not registered the phone number of the
              Download Food account, it will be automatically registered when
              you log in, and the
              <a href="javascript:;">User Agreement</a> is accepted.
            </section>
          </div>
          <div>
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="phone/email/username"
                />
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="password" />
                <div class="switch_button off">
                  <div class="switch_circle"></div>
                  <span class="switch_text">...</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="verification" />
                <img
                  class="get_verification"
                  src="./images/captcha.svg"
                  alt="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">Login</button>
        </form>
        <a href="javascript:;" class="about_us">About Us</a>
      </div>
      <a href="javascript:;" class="go_back" @click="$router.back()">
        <ion-icon
          class="icon-jiantou2"
          size="large"
          name="chevron-back-outline"
        ></ion-icon>
      </a>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",

  setup() {},
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
  font-size: 36px;
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
  text-decoration: none;
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
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
}
.loginContainer .loginInner .go_back > .icon-jiantou2 {
  font-size: 20px;
  color: #999;
}
</style>