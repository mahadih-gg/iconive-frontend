export interface CartAddon {
  name: string;
  value: string;
  price?: number;
}

export interface CartItem {
  product: string;
  name: string;
  price: number;
  amount: number;
  image?: string;
  color?: string | Record<string, unknown>;
  length?: string;
  density?: string;
  size?: string;
  addons?: CartAddon[];
}
