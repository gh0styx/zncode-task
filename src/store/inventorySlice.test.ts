import { describe, expect, it } from 'vitest';
import {
  confirmDeleteOrder,
  requestDeleteOrder,
  selectOrder,
  setProductTypeFilter
} from '@/store/inventorySlice';
import { makeStore } from '@/store/store';

describe('inventory store', () => {
  it('selects and deletes an order with its products', () => {
    const store = makeStore();
    store.dispatch(selectOrder(1));
    store.dispatch(requestDeleteOrder(1));
    store.dispatch(confirmDeleteOrder());
    const state = store.getState().inventory;

    expect(state.selectedOrderId).toBeNull();
    expect(state.orders.some((order) => order.id === 1)).toBe(false);
    expect(state.products.some((product) => product.order === 1)).toBe(false);
  });

  it('stores product type filter', () => {
    const store = makeStore();
    store.dispatch(setProductTypeFilter('Laptops'));
    expect(store.getState().inventory.productTypeFilter).toBe('Laptops');
  });
});
