'use client';

import { formatDateFull, formatDateNumeric, formatMoney } from '@/lib/format';
import { dictionary } from '@/lib/i18n';
import { useAppSelector } from '@/store/hooks';
import type { Product } from '@/types/inventory';

export function ProductRow({ product }: { product: Product }) {
  const orderTitle = useAppSelector(
    (state) =>
      state.inventory.orders.find((order) => order.id === product.order)
        ?.title ?? '—'
  );

  return (
    <article className="product-row">
      <span
        className={`status-dot ${product.isNew ? 'status-dot--green' : 'status-dot--dark'}`}
      />
      <img src={product.photo} alt="" />
      <div className="product-row__name">
        <strong>{product.title}</strong>
        <small>{product.serialNumber}</small>
      </div>
      <span className="product-row__state">
        {product.isNew ? dictionary.ru.free : dictionary.ru.repair}
      </span>
      <div className="product-row__guarantee">
        <span>с {formatDateNumeric(product.guarantee.start)}</span>
        <span>по {formatDateFull(product.guarantee.end)}</span>
      </div>
      <span>{product.isNew ? dictionary.ru.new : dictionary.ru.used}</span>
      <div className="product-row__price">
        {product.price.map((price) => (
          <span key={price.symbol}>
            {formatMoney(price.value, price.symbol)}
          </span>
        ))}
      </div>
      <span className="product-row__type">{product.type}</span>
      <span className="product-row__order">{orderTitle}</span>
      <span className="product-row__date">{formatDateFull(product.date)}</span>
      <button className="icon-button" type="button" aria-label="delete product">
        🗑
      </button>
    </article>
  );
}
