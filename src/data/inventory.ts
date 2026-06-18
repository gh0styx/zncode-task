import type { Order, OrderWithProducts, Product, ProductType } from '@/types/inventory';

export const orders: Order[] = [
  {
    id: 1,
    title: 'Длинное предлинное длиннющее название прихода',
    date: '2017-04-06T12:09:33.000Z',
    description: 'Поставка мониторов и периферии для главного склада',
    location: { city: 'Kyiv', lat: 50.4501, lng: 30.5234 }
  },
  {
    id: 2,
    title: 'Длинное название прихода',
    date: '2017-09-06T12:09:33.000Z',
    description: 'Плановое пополнение офисной техники',
    location: { city: 'Lviv', lat: 49.8397, lng: 24.0297 }
  },
  {
    id: 3,
    title: 'Длинное предлинное длиннющее название прихода',
    date: '2017-06-06T12:09:33.000Z',
    description: 'Техника после диагностики и маркировки',
    location: { city: 'Odesa', lat: 46.4825, lng: 30.7233 }
  },
  {
    id: 4,
    title: 'Длинное предлинное название прихода',
    date: '2017-02-06T12:09:33.000Z',
    description: 'Складской приход с резервными устройствами',
    location: { city: 'Dnipro', lat: 48.4647, lng: 35.0462 }
  }
];

const productTitles = [
  'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
  'Apple MacBook Pro 14 M3 Space Gray',
  'Logitech MX Keys Business Graphite',
  'HP LaserJet Pro M404dn Network'
];

export const productTypes: ProductType[] = ['Monitors', 'Laptops', 'Keyboards', 'Printers'];

export const products: Product[] = Array.from({ length: 16 }, (_, index) => {
  const id = index + 1;
  const type = productTypes[index % productTypes.length];
  const order = (index % orders.length) + 1;
  const usd = type === 'Laptops' ? 2500 : type === 'Printers' ? 430 : type === 'Keyboards' ? 120 : 100;
  return {
    id,
    serialNumber: `SN-12.34567${80 + id}`,
    isNew: index % 2 === 0,
    photo: '/icons/icon.svg',
    title: productTitles[index % productTitles.length],
    type,
    specification: `${type} specification ${id}`,
    guarantee: {
      start: '2017-04-06T12:09:33.000Z',
      end: '2025-08-06T12:09:33.000Z'
    },
    price: [
      { value: usd, symbol: 'USD', isDefault: false },
      { value: usd * 25, symbol: 'UAH', isDefault: true }
    ],
    order,
    date: orders[order - 1].date
  };
});

export const getOrdersWithProducts = (): OrderWithProducts[] =>
  orders.map((order) => ({
    ...order,
    products: products.filter((product) => product.order === order.id)
  }));

export const getOrderWithProducts = (id: number): OrderWithProducts | undefined =>
  getOrdersWithProducts().find((order) => order.id === id);

export const getProductsWithOrderTitle = () =>
  products.map((product) => ({
    ...product,
    orderTitle: orders.find((order) => order.id === product.order)?.title ?? 'Без прихода'
  }));
