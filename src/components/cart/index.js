import Vue from "vue";
import {CartService} from "../../services/cart-service";
import style from './cart.css';

const _non_webpack_require = (requireId) => {
  return eval('require')(requireId);
}

function createVueApp() {
  return new Vue({
    data() {
      return {
        style,
        cartService: new CartService(),
      }
    },
    methods: {
      addProductToCart(product) {
        this.cartService.addProductToCart(product);
        this.$forceUpdate();
      },
      showCart() {
        this.$el.dispatchEvent(new CustomEvent('show-cart', {bubbles: true}));
      }
    },
    template: `
      <div v-bind:class="style['cart-count']" v-on:click="showCart()">
      <div v-bind:class="style['icon']">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path
              d="M6 9h13.938l.5-2H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1V4H2V2h3a1 1 0 0 1 1 1v6zm0 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
              fill="rgba(47,204,113,1)"/>
        </svg>
      </div>

      <strong v-bind:class="style['value']">{{ this.cartService.count() }}</strong>
      </div>
    `
  });
}

export default {
  dependencies: [
    {
      nodeRequire: 'vue',
      globalVariable: 'Vue',
      dependency: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js'
    }
  ],
  async render() {
    const app = createVueApp();
    const vueServerRenderer = _non_webpack_require('vue-server-renderer');
    const renderer = vueServerRenderer.createRenderer();

    return {
      html: await renderer.renderToString(app)
    }
  },
  hydrate(element) {
    const app = createVueApp();

    app.$mount(element.firstChild);

    window.addEventListener('add-to-cart', (e) => {
      app.addProductToCart(e.detail);
    });

    window.addEventListener('cart-updated', (e) => {
      app.$forceUpdate();
    });
  }
};


