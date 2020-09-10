import {CartService} from "./cart-service";

describe('Cart Service', () => {
  const bulbasaur = {
    id: '1',
    name: 'bulbasaur'
  };

  afterEach(() => {
    localStorage.clear();
  });

  describe('counting', () => {
    it('has zero as default count', () => {
      const service = new CartService();
      expect(service.count()).toBe(0);
    });

    it('increases the count when product is added', () => {
      const service = new CartService();

      service.addProductToCart({
        id: '1',
        name: 'bulbasaur'
      });

      expect(service.count()).toBe(1);
    });

    it('increases the count when the same product is added twice', () => {
      const service = new CartService();

      service.addProductToCart(bulbasaur);
      service.addProductToCart(bulbasaur);

      expect(service.count()).toBe(2);
    });
  });

  describe('getting items', () => {
    it('returns an empty list by default', () => {
      const service = new CartService();

      const products = service.getProducts();
      expect(products).toHaveLength(0);
    });

    it('adds only one entry for each product with the count', () => {
      const service = new CartService();

      service.addProductToCart(bulbasaur);
      service.addProductToCart(bulbasaur);

      const products = service.getProducts();
      expect(products[0]).toEqual(expect.objectContaining(bulbasaur));
      expect(products).toHaveLength(1);
      expect(products[0].count).toEqual(2);
    });
  });

  describe('update items', () => {
    it('adds only one entry for each product with the count', () => {
      const service = new CartService();

      service.addProductToCart(bulbasaur);
      service.updateCount(bulbasaur, 100);

      const products = service.getProducts();
      expect(products[0]).toEqual(expect.objectContaining(bulbasaur));
      expect(products).toHaveLength(1);
      expect(products[0].count).toEqual(100);
    });

    it('removes product when set count to zero', () => {
      const service = new CartService();

      service.addProductToCart(bulbasaur);
      service.updateCount(bulbasaur, 0);

      const products = service.getProducts();
      expect(products).toHaveLength(0);
    });
  });
});
