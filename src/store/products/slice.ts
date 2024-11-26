import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryFound, Product, ProductsStoreState } from "../../types";

const initialState: ProductsStoreState = {
	products: [],
	categories: [],
	isLoading: false,
	currentPage: 1,
};

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = [...state.products, ...action.payload];
		},
		setCategories: (state, action: PayloadAction<CategoryFound[]>) => {
			state.categories.push(...action.payload);
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
	},
});

export const { setProducts, setCategories, setIsLoading, setCurrentPage } =
	productsSlice.actions;
