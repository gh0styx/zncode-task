import { configureStore, createSelector } from '@reduxjs/toolkit';
import { filterProductsByType } from '@/lib/filter';
import { inventoryReducer } from '@/store/inventorySlice';
import { sessionReducer } from '@/store/sessionSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      inventory: inventoryReducer,
      session: sessionReducer
    }
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const selectOrders = (state: RootState) => state.inventory.orders;
export const selectProducts = (state: RootState) => state.inventory.products;
export const selectSelectedOrderId = (state: RootState) =>
  state.inventory.selectedOrderId;
export const selectPendingDeleteOrderId = (state: RootState) =>
  state.inventory.pendingDeleteOrderId;
export const selectProductTypeFilter = (state: RootState) =>
  state.inventory.productTypeFilter;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectProductTypeFilter],
  (items, filter) => filterProductsByType(items, filter)
);

export const selectSelectedOrder = createSelector(
  [selectOrders, selectProducts, selectSelectedOrderId],
  (items, productItems, id) => {
    const order = items.find((item) => item.id === id);
    return order
      ? {
          ...order,
          products: productItems.filter((product) => product.order === order.id)
        }
      : null;
  }
);
