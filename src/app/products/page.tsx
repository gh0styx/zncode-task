import { ProductsView } from '@/components/products/ProductsView';
import { getProductsWithOrderTitle } from '@/data/inventory';

export default async function ProductsPage() {
  const initialProducts = getProductsWithOrderTitle();
  return <ProductsView initialCount={initialProducts.length} />;
}
