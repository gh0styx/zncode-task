'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { DeleteOrderModal } from '@/components/orders/DeleteOrderModal';
import { OrderCard } from '@/components/orders/OrderCard';
import { dictionary } from '@/lib/i18n';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOrder } from '@/store/inventorySlice';
import { selectOrders, selectSelectedOrder } from '@/store/store';

const OrderDetails = dynamic(
  () =>
    import('@/components/orders/OrderDetails').then((mod) => mod.OrderDetails),
  {
    loading: () => (
      <div className="details-panel details-panel--loading">Loading...</div>
    )
  }
);

export function OrdersView() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const selectedOrder = useAppSelector(selectSelectedOrder);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return (
    <section
      className="page animate__animated animate__fadeIn"
      data-testid="orders-view"
      data-hydrated={hydrated}
    >
      <div className="page__heading">
        <Button className="page__add" aria-label="add order">
          +
        </Button>
        <h1>
          {dictionary.ru.orders} / {orders.length}
        </h1>
      </div>
      <div className="orders-layout">
        <div className="orders-layout__list">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              compact={Boolean(selectedOrder)}
            />
          ))}
        </div>
        {selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            onClose={() => dispatch(selectOrder(null))}
          />
        )}
      </div>
      <DeleteOrderModal />
    </section>
  );
}
