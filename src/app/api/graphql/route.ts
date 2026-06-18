import { NextResponse } from 'next/server';
import {
  getOrdersWithProducts,
  getOrderWithProducts,
  getProductsWithOrderTitle
} from '@/data/inventory';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const query = String(body.query ?? '');
  const variables = body.variables ?? {};

  if (query.includes('order(')) {
    const id = Number(variables.id ?? query.match(/order\(id:\s*(\d+)/)?.[1]);
    return NextResponse.json({
      data: { order: getOrderWithProducts(id) ?? null }
    });
  }

  if (query.includes('products')) {
    return NextResponse.json({
      data: { products: getProductsWithOrderTitle() }
    });
  }

  return NextResponse.json({ data: { orders: getOrdersWithProducts() } });
}
