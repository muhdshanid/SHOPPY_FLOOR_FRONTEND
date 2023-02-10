import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import globalReducer from "./reducers/globalReducer";
import authService from "./services/authServices";
import blogService from "./services/blogServices";
import brandService from "./services/brandServices";
import categoryService from "./services/categoryServices";
import couponService from "./services/couponServices";
import orderService from "./services/orderServices";
import paymentService from "./services/paymentServices";
import productServices from "./services/productServices";
import uploadService from "./services/uploadServices";
import userService from "./services/userServices";

const store = configureStore({
  reducer: {
    [categoryService.reducerPath]: categoryService.reducer,
    [uploadService.reducerPath]: uploadService.reducer,
    [brandService.reducerPath]: brandService.reducer,
    [productServices.reducerPath]: productServices.reducer,
    [couponService.reducerPath]: couponService.reducer,
    [blogService.reducerPath]: blogService.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
    [authService.reducerPath]: authService.reducer,
    [orderService.reducerPath]: orderService.reducer,
    [userService.reducerPath]: userService.reducer,
    cartReducer: cartReducer,
    globalReducer: globalReducer,
    authReducer: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,
      userService.middleware,
      paymentService.middleware,
      blogService.middleware,
      couponService.middleware,
      categoryService.middleware,
      productServices.middleware,
      uploadService.middleware,
      brandService.middleware,
      orderService.middleware,
    ]),
});

export default store;
