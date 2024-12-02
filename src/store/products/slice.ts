import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryFound, Product, ProductsStoreState } from "../../types";

const initialState: ProductsStoreState = {
	products: [],
	totalProducts: [],
	categories: [],
	isLoading: false,
	hasNextPage: false,
};

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = [...action.payload];
		},
		setProductsScroll: (state, action: PayloadAction<Product[]>) => {
			state.products = [...state.products, ...action.payload];
		},
		setTotalProducts: (state, action: PayloadAction<Product[]>) => {
			state.totalProducts = [...action.payload];
		},
		setCategories: (state, action: PayloadAction<CategoryFound[]>) => {
			state.categories.push(...action.payload);
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setHasNextPage: (state, action: PayloadAction<boolean>) => {
			state.hasNextPage = action.payload;
		},
	},
});

export const {
	setProducts,
	setProductsScroll,
	setTotalProducts,
	setCategories,
	setIsLoading,
	setHasNextPage,
} = productsSlice.actions;
