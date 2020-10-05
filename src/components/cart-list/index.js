import Vue from "vue";
import App from './cart-list';

export function createCartListVueApp() {
  return new Vue({
    render: h => h(App)
  });
}


