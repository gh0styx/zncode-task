import type { Product, ProductType } from '@/types/inventory';

export const filterProductsByType = (
  products: Product[],
  type: ProductType | 'all'
) =>
  type === 'all'
    ? products
    : products.filter((product) => product.type === type);
