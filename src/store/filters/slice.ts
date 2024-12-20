import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getFiltersLocalStorage } from "../../services/filtersLocalStorage";
import type { FiltersStoreState } from "../../types";

// const initialState = {
// 	minPrice: 0,
// 	maxPrice: 0,
// 	currentPage: 1,
// 	category: "",
// 	brand: "",
// 	currency: "usd",
// };

export const filterSlice = createSlice({
	name: "filters",
	initialState: getFiltersLocalStorage() as FiltersStoreState,
	reducers: {
		setMinPriceFilter: (state, action: PayloadAction<number>) => {
			state.minPrice = action.payload;
			state.currentPage = 1;
		},
		setMaxPriceFilter: (state, action: PayloadAction<number>) => {
			state.maxPrice = action.payload;
			state.currentPage = 1;
		},
		setBrandFilter: (state, action: PayloadAction<string>) => {
			state.brand = action.payload;
			state.currentPage = 1;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setCurrency: (state, action: PayloadAction<string>) => {
			state.currency = action.payload;
			state.currentPage = 1;
		},
	},
});

export const {
	setMinPriceFilter,
	setMaxPriceFilter,
	setBrandFilter,
	setCurrentPage,
	setCurrency,
} = filterSlice.actions;
