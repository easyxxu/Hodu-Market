export interface Product {
  product_id: number;
  product_name: string;
  product_info: string;
  price: number;
  image: string;
  stock: number;
  seller: number;
  store_name: string;
  created_at: string;
  updated_at: string;
  shipping_fee: number;
  shipping_method: "DELIVERY" | "PARCEL";
}
