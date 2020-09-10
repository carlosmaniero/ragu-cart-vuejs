import Vue from "vue";
import {CartService} from "../../services/cart-service";
import style from './cart.css';

function createVueApp() {
  return new Vue({
    data() {
      return {
        style,
        cartService: new CartService(),
      }
    },
    methods: {
      changeValue(item, e) {
        this.cartService.updateCount(item, parseInt(e.target.value));
        this.$el.dispatchEvent(new CustomEvent('cart-updated', {bubbles: true}));
        this.$forceUpdate();
      },
      showCatalog() {
        this.$el.dispatchEvent(new CustomEvent('show-catalog', {bubbles: true}));
      }
    },
    template: `
      <div>
        <div v-if="cartService.count() === 0" v-bind:class="style.emptyStage">
          <h1>Your cart is empty.</h1>
        </div>
        <section v-for="item in cartService.getProducts()" :key="item.name" v-bind:class="style.productItem">
          <img v-bind:src="'https://img.pokemondb.net/sprites/home/normal/' + item.name + '.png'" v-bind:alt="item.name" />
          <h1>{{item.name}}</h1>
          <input type="number" v-bind:value="item.count" v-on:change="(e) => changeValue(item, e)">
        </section>
        <div v-bind:class="style.actionButtons">
          <button v-bind:class="style.catalogButton" v-on:click="showCatalog()">
            Go Back to Catalog
          </button>
        </div>
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

    let requireId = 'vue-server-renderer';
    const vueServerRenderer = require(requireId);
    const renderer = vueServerRenderer.createRenderer();

    return {
      html: await renderer.renderToString(app)
    }
  },
  hydrate(element) {
    const app = createVueApp();

    app.$mount(element.firstChild);
  }
};


