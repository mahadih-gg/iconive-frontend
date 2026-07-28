// DUMMY_DATA: remove when backend is ready
// Maps to GET /category/getCategory

import type { Category } from "@/types/category.type";

import { DUMMY_IDS } from "./_ids.dummy";

export const categoriesDummy: Category[] = [
  {
    _id: DUMMY_IDS.categoryGents,
    name: "Gents",
    subcategories: [
      { _id: DUMMY_IDS.subGentsLace, name: "Lace Front", category: DUMMY_IDS.categoryGents },
      { _id: DUMMY_IDS.subGentsFull, name: "Full Cap", category: DUMMY_IDS.categoryGents },
    ],
  },
  {
    _id: DUMMY_IDS.categoryLadies,
    name: "Ladies",
    subcategories: [
      { _id: DUMMY_IDS.subLadiesLace, name: "Lace Front", category: DUMMY_IDS.categoryLadies },
      { _id: DUMMY_IDS.subLadiesSilk, name: "Silk Top", category: DUMMY_IDS.categoryLadies },
    ],
  },
];
