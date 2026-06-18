'use client';

import { Button } from 'react-bootstrap';
import { dictionary } from '@/lib/i18n';
import type { OrderWithProducts } from '@/types/inventory';

export function OrderDetails({
  order,
  onClose
}: {
  order: OrderWithProducts;
  onClose: () => void;
}) {
  return (
    <aside className="details-panel animate__animated animate__fadeInRight">
      <Button
        className="details-panel__close"
        aria-label="close order details"
        onClick={onClose}
      >
        ×
      </Button>
      <h2>{order.title}</h2>
      <div className="details-panel__products">
        {order.products.map((product) => (
          <div className="detail-product" key={product.id}>
            <span className="status-dot status-dot--green" />
            <img src={product.photo} alt="" />
            <div>
              <strong>{product.title}</strong>
              <small>{product.serialNumber}</small>
            </div>
            <span className="detail-product__state">{dictionary.ru.free}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
