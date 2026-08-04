// DUMMY_DATA: remove entire src/dummy/ folder when backend is ready

export { DUMMY_IDS } from "./_ids.dummy";
export {
  productsDummy,
  getProductsDummy,
  getProductByIdDummy,
} from "./products.dummy";
export { featuredProductsDummy } from "./featuredProducts.dummy";
export { topSellingDummy } from "./topSelling.dummy";
export { offersDummy } from "./offers.dummy";
export { stockDummy } from "./stock.dummy";
export { categoriesDummy } from "./categories.dummy";
export { createDummyJwt, loginDummy, signupDummy } from "./auth.dummy";
export { getMeDummy, updateMeDummy } from "./users.dummy";
export {
  getWishlistProductsDummy,
  getWishlistProductDummy,
  addWishlistProductDummy,
  removeWishlistProductDummy,
} from "./wishlist.dummy";
export {
  ordersActiveDummy,
  ordersHistoryDummy,
  ordersCancelledDummy,
  getOrderByIdDummy,
  createOrderDummy,
  createRefundRequestDummy,
  createPaymentDummy,
} from "./orders.dummy";
export { wholesaleProductsDummy, submitInquiryDummy } from "./wholesale.dummy";
export { createCustomProductDummy } from "./customProducts.dummy";
export { blogTabsDummy, blogContentDummy } from "./blogs.dummy";
