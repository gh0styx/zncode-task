import { describe, expect, it } from 'vitest';
import { products } from '@/data/inventory';
import { calculateOrderTotals, formatDateFull, formatDateNumeric, formatDateShort } from '@/lib/format';

describe('inventory formatting', () => {
  it('formats dates in short, full, and numeric assignment formats', () => {
    expect(formatDateShort('2017-04-06T12:09:33.000Z')).toBe('04 / 06');
    expect(formatDateFull('2017-04-06T12:09:33.000Z')).toBe('06 / Апр / 2017');
    expect(formatDateNumeric('2017-04-06T12:09:33.000Z')).toBe('06/04/2017');
  });

  it('calculates order totals in both currencies', () => {
    const totals = calculateOrderTotals(products.filter((product) => product.order === 1));
    expect(totals.USD).toBeGreaterThan(0);
    expect(totals.UAH).toBe(totals.USD * 25);
  });
});
