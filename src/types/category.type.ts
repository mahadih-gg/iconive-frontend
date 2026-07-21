export interface Category {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
  children?: Category[];
  subCategories?: Category[];
  [key: string]: unknown;
}
