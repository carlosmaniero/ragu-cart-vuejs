export class CartService {
  addProductToCart(product) {
    const cart = this.getProducts();
    const item = this.getItemOrCreate(cart, product);
    item.count++;
    this._saveCart(cart);
  }

  updateCount(product, count) {
    const cart = this.getProducts();
    const item = this.getItemOrCreate(cart, product);
    item.count = count;
    this._saveCart(cart);
  }

  getItemOrCreate(cart, product) {
    const storedProduct = cart.find((stored) => stored.id === product.id);

    if (storedProduct) {
      return storedProduct;
    }

    const createdProduct = {...product, count: 0};
    cart.push(createdProduct);
    return createdProduct;
  }

  count() {
    return this.getProducts()
      .map((product) => product.count)
      .reduce((acc, count) => acc + count, 0);
  }

  getProducts() {
    if (typeof localStorage === "undefined") {
      return [];
    }
    return JSON.parse(localStorage.getItem('cart-mf-storage') || '[]');
  }

  _saveCart(cart) {
    localStorage.setItem('cart-mf-storage', JSON.stringify(cart.filter((prod) => prod.count !== 0)));
  }
}
