import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store";

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existsProduct = products.find(({ id }) => newProduct.id === id);
  if (existsProduct)
    return products.map((product) =>
      product.id === existsProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  return [...products, { ...newProduct, quantity: 1 }];
}

export function remove(products: ProductCartProps[], productRemoveId: string) {
  const updatedProduct = products.map((product) =>
    product.id === productRemoveId
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product
  );
  return updatedProduct.filter((product) => product.quantity > 0);
}
