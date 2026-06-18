import type { CurrencySymbol, Product, TotalsByCurrency } from '@/types/inventory';

const monthRu = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

export const formatDateShort = (value: string) => {
  const date = new Date(value);
  return `${String(date.getUTCMonth() + 1).padStart(2, '0')} / ${String(date.getUTCDate()).padStart(2, '0')}`;
};

export const formatDateFull = (value: string) => {
  const date = new Date(value);
  return `${String(date.getUTCDate()).padStart(2, '0')} / ${monthRu[date.getUTCMonth()]} / ${date.getUTCFullYear()}`;
};

export const formatDateNumeric = (value: string) => {
  const date = new Date(value);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export const formatClock = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);

export const formatWeekday = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', { weekday: 'long' }).format(date).replace(/^./, (letter) => letter.toUpperCase());

export const formatHeaderDate = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(date)
    .replace('.', '');

export const formatMoney = (value: number, symbol: CurrencySymbol) =>
  `${new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  }).format(value)} ${symbol}`;

export const calculateOrderTotals = (products: Product[]): TotalsByCurrency =>
  products.reduce<TotalsByCurrency>(
    (totals, product) => {
      product.price.forEach((price) => {
        totals[price.symbol] += price.value;
      });
      return totals;
    },
    { USD: 0, UAH: 0 }
  );
