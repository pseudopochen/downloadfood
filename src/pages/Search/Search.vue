<template>
  <section class="search">
    <HeaderTop title="Search" />
    <form class="search_form" @submit.prevent="search">
      <input
        type="search"
        placeholder="请输入商家名称"
        class="search_input"
        v-model="keyword"
      />
      <input type="submit" class="search_submit" />
    </form>
    <section class="list" v-if="!noSearchShops">
      <ul class="list_container">
        <!--:to="'/shop?id='+item.id"-->
        <router-link
          :to="{ path: '/shop', query: { id: item.id } }"
          tag="li"
          v-for="item in searchShops"
          :key="item.id"
          class="list_li"
        >
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{ item.name }}</span>
              </p>
              <p>月售 {{ item.month_sales || item.recent_order_num }} 单</p>
              <p>
                {{ item.delivery_fee || item.float_minimum_order_amount }}
                元起送 / 距离{{ item.distance }}
              </p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>

    <div class="search_none" v-else>Sorry, no shops match search keyword!</div>
  </section>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default defineComponent({
  name: "Search",
  components: {
    HeaderTop,
  },
  setup() {
    const store = useStore();
    const keyword = ref("");
    const searchShops = computed(() => store.state.searchShops);
    const noSearchShops = ref(false); // don't use string "false" as input to ref()

    function search() {
      const searchKeyword = keyword.value.trim();
      if (searchKeyword) {
        store.dispatch("searchShops", searchKeyword);
      }
    }

    const imgBaseUrl = "http://cangdu.org:8001/img/";

    watch(searchShops, (value) => {
      console.log("value: ", value);
      if (!value.length) {
        noSearchShops.value = true;
      } else {
        noSearchShops.value = false;
      }
    });

    return {
      keyword,
      search,
      searchShops,
      imgBaseUrl,
      noSearchShops,
    };
  },
});
</script>

<style>
.search {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.search .search_form {
  *zoom: 1;
  margin-top: 45px;
  background-color: #fff;
  padding: 12px 8px;
}

.search .search_form::after {
  content: "";
  display: block;
  clear: both;
}

.search .search_form input {
  height: 35px;
  padding: 0 4px;
  border-radius: 2px;
  font-weight: bold;
  outline: none;
}

.search .search_form input.search_input {
  float: left;
  width: 79%;
  border: 4px solid #f2f2f2;
  font-size: 14px;
  color: #333;
  background-color: #f2f2f2;
}

.search .search_form input.search_submit {
  float: right;
  width: 18%;
  border: 4px solid #02a774;
  font-size: 14px;
  color: #fff;
  background-color: #02a774;
}

.search .list .list_container {
  background-color: #fff;
}

.search .list .list_container .list_li {
  display: flex;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #e4e4e4;
}

.search .list .list_container .list_li .item_left {
  margin-right: 10px;
}

.search .list .list_container .list_li .item_left .restaurant_img {
  width: 50px;
  height: 50px;
  display: block;
}

.search .list .list_container .list_li .item_right {
  font-size: 12px;
  flex: 1;
}

.search .list .list_container .list_li .item_right .item_right_text p {
  line-height: 12px;
  margin-bottom: 6px;
}

.search
  .list
  .list_container
  .list_li
  .item_right
  .item_right_text
  p:last-child {
  margin-bottom: 0;
}

.search .search_none {
  margin: 0 auto;
  color: #333;
  background-color: #fff;
  text-align: center;
  margin-top: 0.125rem;
}
</style>