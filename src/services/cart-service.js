export class CartService {
  addProductToCart(product) {
    const cart = this.getProducts()
    cart.push(product);
    this._saveCart(cart);
  }

  getProducts() {
    if (typeof localStorage === "undefined") {
      return [];
    }
    return JSON.parse(localStorage.getItem('user-cart') || '[]');
  }

  _saveCart(cart) {
    localStorage.setItem('user-cart', JSON.stringify(cart))
  }
}
