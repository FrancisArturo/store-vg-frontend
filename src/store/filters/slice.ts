import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	minPrice: 0,
	maxPrice: 0,
	currentPage: 1,
	category: "",
	brand: "",
};

export const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setMinPriceFilter: (state, action: PayloadAction<number>) => {
			state.minPrice = action.payload;
			state.currentPage = 1;
		},
		setMaxPriceFilter: (state, action: PayloadAction<number>) => {
			state.maxPrice = action.payload;
			state.currentPage = 1;
		},
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload;
		},
		setBrandFilter: (state, action: PayloadAction<string>) => {
			state.brand = action.payload;
			state.currentPage = 1;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
	},
});

export const {
	setMinPriceFilter,
	setMaxPriceFilter,
	setCategory,
	setBrandFilter,
	setCurrentPage,
} = filterSlice.actions;
