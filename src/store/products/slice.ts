import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryFound, Product, ProductsStoreState } from "../../types";

const initialState: ProductsStoreState = {
	products: [],
	totalProducts: [],
	totalProductsWithQuery: [],
	productSelected: undefined,
	categories: [],
	isLoading: false,
	hasNextPage: false,
	error: undefined,
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
		setTotalProductsWithQuery: (state, action: PayloadAction<Product[]>) => {
			state.totalProductsWithQuery = [...action.payload];
		},
		setProductSelected: (state, action: PayloadAction<Product>) => {
			state.productSelected = { ...action.payload };
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
		setError: (state, action: PayloadAction<Error>) => {
			state.error = action.payload;
		},
	},
});

export const {
	setProducts,
	setProductsScroll,
	setTotalProducts,
	setTotalProductsWithQuery,
	setProductSelected,
	setCategories,
	setIsLoading,
	setHasNextPage,
	setError,
} = productsSlice.actions;
