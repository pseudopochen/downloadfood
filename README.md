# DownloadFood client

This is the client-side of a mobile app, written in Vue 3, for finding and checking Chinese restrauants nearby.
Some screenshots can be found under "public/screenshots/".

The server-side code is in a separate repository "downloadfood_server".

## Project setup

This project was written using composition API of Vue 3. I used ES6, but did not use typescript yet (may try that in the future).

I used Vuex 4, which is compatible with Vue 3 composition API, to manage state.

The routing was done using Vue Router.

I used Mockjs to create mock restaurant data and intercept ajax calls.

The ajax calls to the server-side API was implemented using axios, promise and async/await.

I used PrimeVue, which is currently one of the few UI libraries compatible with Vue 3, for Pop-up confirmation dialog boxes and toasts.

The icon fonts came from https://www.iconfont.cn/, which is part of Alibaba.

The carousel on the main page was implemented using "swiperjs".

I used "BetteScroll" for horizontal and vertical scrolling on the mobile device. 

Component lazy-load by using dynamic "import".

Image lazy-load by using "vue3-lazyload".

### Notes on using "BetterScroll": 

1. Remember to check the style of the wrapper and the style of the content. The height of the content (for vertical scrolling) must be larger than the height of the wrapper for the scrolling to work.

2. The scroller has to be initialized right after nextTick() and must call refresh() to re-calculate the content height after the content data is updated.

### Notes on keep-alive:

The syntax for caching router components has changed significantly from Vue 2.x to Vue 3. In Vue 2.x, it is relatively straightforward:
<keep-alive>
    <router-view></router-view>
</keep-alive>
But in Vue 3, the keep-alive must wrap a dynamic component, with its "is" property value given by the router-view:
<router-view v-slot="{Component}">
    <keep-alive>
        <component :is="Component"></component>
    </keep-alive>
</router-view>
Checkout the stack-overflow post: https://stackoverflow.com/questions/65619181/how-to-make-certain-component-keep-alive-with-router-view-in-vue-3

