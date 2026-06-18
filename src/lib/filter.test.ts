import { describe, expect, it } from 'vitest';
import { products } from '@/data/inventory';
import { filterProductsByType } from '@/lib/filter';

describe('product filters', () => {
  it('returns all products for all filter', () => {
    expect(filterProductsByType(products, 'all')).toHaveLength(products.length);
  });

  it('filters products by type', () => {
    const monitors = filterProductsByType(products, 'Monitors');
    expect(monitors.length).toBeGreaterThan(0);
    expect(monitors.every((product) => product.type === 'Monitors')).toBe(true);
  });
});
