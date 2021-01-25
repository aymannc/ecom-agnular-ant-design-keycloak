export interface ProductsResponse {
  _embedded: Embedded;
  _links: ProductsResponseLinks;
  page: Page;
}

export interface Embedded {
  products: Product[];
}

export interface Product {
  image: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  _links: ProductLinks;
}

export interface ProductLinks {
  self: Profile;
  product: Profile;
}

export interface Profile {
  href: string;
}

export interface ProductsResponseLinks {
  self: Profile;
  profile: Profile;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
