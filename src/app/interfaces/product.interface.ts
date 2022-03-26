export interface Product {
  id: number,
  name: string,
  inStock: boolean,
  estimatedStock?: number | string,
  price: string,
}
