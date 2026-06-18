import { calculateOrderTotals } from '@/lib/format';
import type { Product } from '@/types/inventory';

self.onmessage = (event: MessageEvent<{ products: Product[] }>) => {
  const byType = event.data.products.reduce<Record<string, number>>(
    (acc, product) => {
      acc[product.type] = (acc[product.type] ?? 0) + 1;
      return acc;
    },
    {}
  );

  self.postMessage({
    byType,
    totals: calculateOrderTotals(event.data.products)
  });
};
