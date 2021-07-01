import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
} from "./mutation-types";

const mutations = {
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address;
  },
  [RECEIVE_CATEGORIES](state, { categories }) {
    state.categories = categories;
  },
  [RECEIVE_SHOPS](state, { shops }) {
    state.shops = shops;
  },
};

export default mutations;
