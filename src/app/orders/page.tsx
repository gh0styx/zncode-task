import { OrdersView } from '@/components/orders/OrdersView';
import { getOrdersWithProducts } from '@/data/inventory';

export default async function OrdersPage() {
  const initialOrders = getOrdersWithProducts();
  return <OrdersView initialCount={initialOrders.length} />;
}
