'use client';

import { useEffect, useMemo, useState } from 'react';
import { calculateOrderTotals } from '@/lib/format';
import type { Product } from '@/types/inventory';

type WorkerResult = {
  byType: Record<string, number>;
  totals: Record<string, number>;
};

export function InventoryInsights({ products }: { products: Product[] }) {
  const [workerResult, setWorkerResult] = useState<WorkerResult | null>(null);
  const max = useMemo(() => Math.max(1, ...Object.values(workerResult?.byType ?? { all: 1 })), [workerResult]);

  useEffect(() => {
    if (typeof Worker === 'undefined') {
      const byType = products.reduce<Record<string, number>>((acc, product) => {
        acc[product.type] = (acc[product.type] ?? 0) + 1;
        return acc;
      }, {});
      setWorkerResult({ byType, totals: calculateOrderTotals(products) });
      return;
    }

    const worker = new Worker(new URL('../../workers/aggregates.worker.ts', import.meta.url));
    worker.onmessage = (event: MessageEvent<WorkerResult>) => setWorkerResult(event.data);
    worker.postMessage({ products });
    return () => worker.terminate();
  }, [products]);

  return (
    <section className="insights" aria-label="inventory insights">
      <div className="insights__chart">
        <h2>Charts</h2>
        {Object.entries(workerResult?.byType ?? {}).map(([type, count]) => (
          <div className="chart-row" key={type}>
            <span>{type}</span>
            <div><i style={{ width: `${(count / max) * 100}%` }} /></div>
            <strong>{count}</strong>
          </div>
        ))}
      </div>
      <div className="insights__graph">
        <h2>Graph</h2>
        <svg viewBox="0 0 360 120" role="img" aria-label="orders products graph">
          <circle cx="60" cy="60" r="28" />
          <circle cx="180" cy="35" r="22" />
          <circle cx="180" cy="85" r="22" />
          <circle cx="300" cy="60" r="28" />
          <path d="M88 60 L158 35 M88 60 L158 85 M202 35 L272 60 M202 85 L272 60" />
          <text x="60" y="65">Orders</text>
          <text x="300" y="65">Products</text>
        </svg>
      </div>
      <div className="insights__map">
        <h2>Maps</h2>
        <div className="map-card">
          <span>Kyiv warehouse</span>
          <strong>50.4501, 30.5234</strong>
        </div>
      </div>
    </section>
  );
}
