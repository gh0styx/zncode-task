import { NextResponse } from 'next/server';
import { getOrdersWithProducts } from '@/data/inventory';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(getOrdersWithProducts());
}
