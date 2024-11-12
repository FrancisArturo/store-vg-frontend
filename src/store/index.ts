import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./products/slice";
import { cartSlice } from "./cart/slice";
import { filterSlice } from "./filters/slice";

export const store = configureStore({
	reducer: {
		products: productsSlice.reducer,
		cart: cartSlice.reducer,
		filters: filterSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
