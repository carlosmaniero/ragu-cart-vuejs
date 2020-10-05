<template>
  <div>
    <div v-if="cartService.count() === 0" class="emptyStage">
      <h1>Your cart is empty.</h1>
    </div>
    <section v-for="item in cartService.getProducts()" :key="item.name" class="productItem">
      <img v-bind:src="'https://img.pokemondb.net/sprites/home/normal/' + item.name + '.png'" v-bind:alt="item.name" />
      <h1>{{item.name}}</h1>
      <input type="number" v-bind:value="item.count" v-on:change="(e) => changeValue(item, e)">
    </section>
    <div class="actionButtons">
      <button class="catalogButton" v-on:click="showCatalog()">
        Go Back to Catalog
      </button>
    </div>
  </div>
</template>

<script>
import {CartService} from "../../services/cart-service";

export default {
  name: 'CartList',
  data() {
    return {
      cartService: new CartService(),
    }
  },
  methods: {
    changeValue(item, e) {
      this.cartService.updateCount(item, Math.max(parseInt(e.target.value || ''), 0));
      this.$el.dispatchEvent(new CustomEvent('cart-updated', {bubbles: true}));
      this.$forceUpdate();
    },
    showCatalog() {
      this.$el.dispatchEvent(new CustomEvent('show-catalog', {bubbles: true}));
    }
  }
}
</script>

<style scoped>
.emptyStage h1 {
  font-size: 18px;
  text-align: center;
  font-family: sans-serif;
}

.catalogButton {
  border-radius: 3px;
  border: 2px solid palevioletred;
  background: palevioletred;
  color: white;
  padding: 1em 2em;
}

.actionButtons {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}

.productItem {
  display: grid;
  grid-template-columns: 128px 1fr 75px;
  align-items: center;
  grid-gap: 20px;
  border-bottom: 1px solid #eeeeee;
  font-family: sans-serif;
  text-transform: capitalize;
  padding-bottom: 20px;
}

.productItem h1 {
  font-size: 18px;
  color: #333333;
}
</style>
