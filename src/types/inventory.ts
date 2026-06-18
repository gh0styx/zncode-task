export type CurrencySymbol = 'USD' | 'UAH';

export type Price = {
  value: number;
  symbol: CurrencySymbol;
  isDefault: boolean;
};

export type Guarantee = {
  start: string;
  end: string;
};

export type ProductType = 'Monitors' | 'Laptops' | 'Keyboards' | 'Printers';

export type Product = {
  id: number;
  serialNumber: string;
  isNew: boolean;
  photo: string;
  title: string;
  type: ProductType;
  specification: string;
  guarantee: Guarantee;
  price: Price[];
  order: number;
  date: string;
};

export type Order = {
  id: number;
  title: string;
  date: string;
  description: string;
  location: {
    city: string;
    lat: number;
    lng: number;
  };
};

export type OrderWithProducts = Order & {
  products: Product[];
};

export type TotalsByCurrency = Record<CurrencySymbol, number>;
