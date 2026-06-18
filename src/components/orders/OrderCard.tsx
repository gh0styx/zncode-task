'use client';

import { Button } from 'react-bootstrap';
import { useMemo } from 'react';
import clsx from 'clsx';
import { calculateOrderTotals, formatDateFull, formatDateShort, formatMoney } from '@/lib/format';
import { inventoryEvents } from '@/lib/events';
import { requestDeleteOrder, selectOrder } from '@/store/inventorySlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Order } from '@/types/inventory';

export function OrderCard({ order, compact }: { order: Order; compact: boolean }) {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.inventory.products);
  const products = useMemo(() => allProducts.filter((product) => product.order === order.id), [allProducts, order.id]);
  const selected = useAppSelector((state) => state.inventory.selectedOrderId === order.id);
  const totals = calculateOrderTotals(products);

  const openOrder = () => {
    inventoryEvents.emit('order:selected', { orderId: order.id });
    dispatch(selectOrder(order.id));
  };

  const openDelete = () => {
    inventoryEvents.emit('order:delete-requested', { orderId: order.id });
    dispatch(requestDeleteOrder(order.id));
  };

  return (
    <article className={clsx('order-card', selected && 'order-card--selected', compact && 'order-card--compact')} onClick={openOrder}>
      {!compact && <h2 className="order-card__title">{order.title}</h2>}
      <div className="order-card__count" aria-label="product count">
        <span className="order-card__icon">☷</span>
        <strong>{products.length}</strong>
        <span>Продукта</span>
      </div>
      <div className="order-card__date">
        <small>{formatDateShort(order.date)}</small>
        <span>{formatDateFull(order.date)}</span>
      </div>
      {!compact && (
        <div className="order-card__money">
          <small>{formatMoney(totals.USD, 'USD')}</small>
          <span>{formatMoney(totals.UAH, 'UAH')}</span>
        </div>
      )}
      {selected && compact && <span className="order-card__arrow">›</span>}
      {!compact && (
        <Button
          className="icon-button"
          variant="link"
          aria-label={`delete ${order.title}`}
          onClick={(event) => {
            event.stopPropagation();
            openDelete();
          }}
        >
          🗑
        </Button>
      )}
    </article>
  );
}
