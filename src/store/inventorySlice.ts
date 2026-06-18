import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { orders, products } from '@/data/inventory';
import type { Order, Product, ProductType } from '@/types/inventory';

type InventoryState = {
  orders: Order[];
  products: Product[];
  selectedOrderId: number | null;
  pendingDeleteOrderId: number | null;
  productTypeFilter: ProductType | 'all';
};

const initialState: InventoryState = {
  orders,
  products,
  selectedOrderId: null,
  pendingDeleteOrderId: null,
  productTypeFilter: 'all'
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    selectOrder(state, action: PayloadAction<number | null>) {
      state.selectedOrderId = action.payload;
    },
    requestDeleteOrder(state, action: PayloadAction<number>) {
      state.pendingDeleteOrderId = action.payload;
    },
    cancelDeleteOrder(state) {
      state.pendingDeleteOrderId = null;
    },
    confirmDeleteOrder(state) {
      if (state.pendingDeleteOrderId === null) return;
      state.products = state.products.filter(
        (product) => product.order !== state.pendingDeleteOrderId
      );
      state.orders = state.orders.filter(
        (order) => order.id !== state.pendingDeleteOrderId
      );
      if (state.selectedOrderId === state.pendingDeleteOrderId)
        state.selectedOrderId = null;
      state.pendingDeleteOrderId = null;
    },
    setProductTypeFilter(state, action: PayloadAction<ProductType | 'all'>) {
      state.productTypeFilter = action.payload;
    }
  }
});

export const {
  selectOrder,
  requestDeleteOrder,
  cancelDeleteOrder,
  confirmDeleteOrder,
  setProductTypeFilter
} = inventorySlice.actions;

export const inventoryReducer = inventorySlice.reducer;
