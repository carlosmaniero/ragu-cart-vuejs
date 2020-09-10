import Vue from "vue";

const app = new Vue({
  data() {
    return {
      fontSize: 10
    }
  },
  methods: {
    increase() {
      this.fontSize++;
    }
  },
  template: `
    <div v-bind:style="{ fontSize: fontSize + 'px' }">
      Hello, World!
      <button v-on:click="increase()">Click me!</button>
    </div>
  `
});

export default {
  dependencies: [
    {
      nodeRequire: 'vue',
      globalVariable: 'Vue',
      dependency: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js'
    }
  ],
  async render() {
    let requireId = 'vue-server-renderer';
    const vueServerRenderer = require(requireId);
    const renderer = vueServerRenderer.createRenderer();

    return {
      html: await renderer.renderToString(app)
    }
  },
  hydrate(element) {
    console.log(app);
    app.$mount(element);
  }
};


