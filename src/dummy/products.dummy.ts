// DUMMY_DATA: remove when backend is ready

import type { Product, ProductFilters } from "@/types/product.type";

import { DUMMY_IDS } from "./_ids.dummy";

// All photos from public/Image — hair color & product shots
const PHOTOS = [
  "/Image/Black/1jetblack.webp",
  "/Image/Black/1C cool black.webp",
  "/Image/Brown/2 DARKEST BROWN.webp",
  "/Image/Blonde/613 PLATINUM BLONDE.webp",
  "/Image/custom/wigs1.jpg",
  "/Image/Black/1B 0ff black.webp",
  "/Image/Blonde/22 BLONDE.webp",
  "/Image/Brown/4 medium brown.webp",
  "/Image/custom/wigs2.jpg",
  "/Image/Blonde/10R DIRTY BLONDE.webp",
  "/Image/Brown/6 chestnut brown.webp",
  "/Image/custom/wigs3.jpg",
] as const;

export const productsDummy: Product[] = [
  {
    _id: DUMMY_IDS.product1,
    name: "Lace Front Natural Black Wig",
    description: "Premium remy human hair lace front wig with natural hairline.",
    price: 280,
    discount: 10,
    photo: PHOTOS[0],
    quantity: 12,
    sold: 45,
    available: true,
    category: DUMMY_IDS.categoryLadies,
    subCategory: DUMMY_IDS.subLadiesLace,
  },
  {
    _id: DUMMY_IDS.product2,
    name: "Full Cap Straight Wig",
    description: "Full cap straight style, easy to wear and maintain.",
    price: 220,
    discount: 0,
    photo: PHOTOS[1],
    quantity: 8,
    sold: 32,
    available: true,
    category: DUMMY_IDS.categoryLadies,
    subCategory: DUMMY_IDS.subLadiesSilk,
  },
  {
    _id: DUMMY_IDS.product3,
    name: "Gents Mono Top Wig",
    description: "Breathable mono top for a natural look for men.",
    price: 310,
    discount: 5,
    photo: PHOTOS[2],
    quantity: 6,
    sold: 28,
    available: true,
    category: DUMMY_IDS.categoryGents,
    subCategory: DUMMY_IDS.subGentsLace,
  },
  {
    _id: DUMMY_IDS.product4,
    name: "Silk Top Wave Wig",
    description: "Soft silk top with medium wave texture.",
    price: 350,
    discount: 15,
    photo: PHOTOS[3],
    quantity: 10,
    sold: 51,
    available: true,
    category: DUMMY_IDS.categoryLadies,
    subCategory: DUMMY_IDS.subLadiesSilk,
  },
  {
    _id: DUMMY_IDS.product5,
    name: "Skin Base Gentle Wig",
    description: "Ultra-thin skin base for undetectable parting.",
    price: 400,
    discount: 0,
    photo: PHOTOS[4],
    quantity: 4,
    sold: 19,
    available: true,
    category: DUMMY_IDS.categoryGents,
    subCategory: DUMMY_IDS.subGentsFull,
  },
  {
    _id: DUMMY_IDS.product6,
    name: "Bob Cut Lace Wig",
    description: "Stylish short bob lace wig, ready to wear.",
    price: 190,
    discount: 20,
    photo: PHOTOS[5],
    quantity: 15,
    sold: 67,
    available: true,
    category: DUMMY_IDS.categoryLadies,
    subCategory: DUMMY_IDS.subLadiesLace,
  },
  {
    _id: DUMMY_IDS.product7,
    name: "Long Curly Remy Wig",
    description: "Voluminous long curly remy human hair.",
    price: 420,
    discount: 8,
    photo: PHOTOS[6],
    quantity: 7,
    sold: 22,
    available: true,
    category: DUMMY_IDS.categoryLadies,
    subCategory: DUMMY_IDS.subLadiesLace,
  },
  {
    _id: DUMMY_IDS.product8,
    name: "Classic Gents Cap",
    description: "Classic men's cap for everyday confidence.",
    price: 250,
    discount: 0,
    photo: PHOTOS[7],
    quantity: 9,
    sold: 40,
    available: true,
    category: DUMMY_IDS.categoryGents,
    subCategory: DUMMY_IDS.subGentsFull,
  },
  {
    _id: DUMMY_IDS.product9,
    name: "Highlight Blonde Lace Front",
    description: "Lace front with soft blonde highlights.",
    price: 360,
    discount: 12,
    photo: PHOTOS[8],
    quantity: 5,
    sold: 15,
    available: true,
    category: DUMMY_IDS.categoryLadies,
    subCategory: DUMMY_IDS.subLadiesLace,
  },
  {
    _id: DUMMY_IDS.product10,
    name: "Stock Ready Straight Cap",
    description: "Ready-to-ship straight stock wig.",
    price: 180,
    discount: 0,
    photo: PHOTOS[9],
    quantity: 20,
    sold: 11,
    available: true,
    category: DUMMY_IDS.categoryLadies,
    subCategory: DUMMY_IDS.subLadiesSilk,
  },
  {
    _id: DUMMY_IDS.product11,
    name: "Dense Top Gents Wig",
    description: "Higher density top for fuller coverage.",
    price: 330,
    discount: 7,
    photo: PHOTOS[10],
    quantity: 6,
    sold: 24,
    available: true,
    category: DUMMY_IDS.categoryGents,
    subCategory: DUMMY_IDS.subGentsLace,
  },
  {
    _id: DUMMY_IDS.product12,
    name: "Offer Bundle Wave Wig",
    description: "Special offer wave wig with free shipping over $200.",
    price: 299,
    discount: 25,
    photo: PHOTOS[11],
    quantity: 14,
    sold: 58,
    available: true,
    category: DUMMY_IDS.categoryLadies,
    subCategory: DUMMY_IDS.subLadiesLace,
  },
];

export function getProductsDummy(filters?: ProductFilters): Product[] {
  let list = [...productsDummy];
  const nested = filters?.filters as
    | { categories?: string[]; subcategories?: string[] }
    | undefined;
  const categories = (
    (Array.isArray(filters?.categories) ? filters.categories : undefined) ??
    nested?.categories ??
    (filters?.category ? [String(filters.category)] : [])
  ) as string[];
  const subcategories = (
    (Array.isArray(filters?.subcategories) ? filters.subcategories : undefined) ??
    nested?.subcategories ??
    []
  ) as string[];

  if (categories.length > 0) {
    list = list.filter((p) => {
      const cat = typeof p.category === "string" ? p.category : p.category?._id;
      return cat ? categories.includes(cat) : false;
    });
  }

  if (subcategories.length > 0) {
    list = list.filter((p) => {
      const sub = p.subCategory as string | undefined;
      return sub ? subcategories.includes(sub) : false;
    });
  }

  if (filters?.search) {
    const q = String(filters.search).toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q));
  }

  return list;
}

export function getProductByIdDummy(id: string): Product {
  return productsDummy.find((p) => p._id === id) ?? productsDummy[0];
}
