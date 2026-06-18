'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { ProductRow } from '@/components/products/ProductRow';
import { dictionary } from '@/lib/i18n';
import { inventoryEvents } from '@/lib/events';
import { productTypes } from '@/data/inventory';
import { setProductTypeFilter } from '@/store/inventorySlice';
import { selectFilteredProducts, selectProductTypeFilter } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { ProductType } from '@/types/inventory';

const InventoryInsights = dynamic(() => import('@/components/visuals/InventoryInsights').then((mod) => mod.InventoryInsights), {
  ssr: false
});

export function ProductsView({ initialCount }: { initialCount: number }) {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectProductTypeFilter);
  const products = useAppSelector(selectFilteredProducts);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const saved = localStorage.getItem('inventory:productType');
    if (saved) {
      dispatch(setProductTypeFilter(saved as ProductType | 'all'));
    }
  }, [dispatch]);

  const setFilter = (value: ProductType | 'all') => {
    localStorage.setItem('inventory:productType', value);
    inventoryEvents.emit('product:filtered', { type: value });
    dispatch(setProductTypeFilter(value));
  };

  return (
    <section className="page animate__animated animate__fadeIn" data-testid="products-view" data-hydrated={hydrated}>
      <div className="products-heading">
        <h1>{dictionary.ru.products} / {products.length}</h1>
        <Form.Group className="products-heading__filter" controlId="product-type-filter">
          <Form.Label>{dictionary.ru.type}:</Form.Label>
          <Form.Select value={filter} onChange={(event) => setFilter(event.target.value as ProductType | 'all')}>
            <option value="all">Все</option>
            {productTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </Form.Select>
        </Form.Group>
      </div>
      <div className="products-table">
        {products.map((product) => <ProductRow key={product.id} product={product} />)}
      </div>
      <InventoryInsights products={products} />
    </section>
  );
}
