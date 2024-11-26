import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	minPrice: 0,
	maxPrice: 0,
	category: "",
	brand: "",
};

export const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setMinPriceFilter: (state, action: PayloadAction<number>) => {
			state.minPrice = action.payload;
		},
		setMaxPriceFilter: (state, action: PayloadAction<number>) => {
			state.maxPrice = action.payload;
		},
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload;
		},
		setBrandFilter: (state, action: PayloadAction<string>) => {
			state.brand = action.payload;
		},
	},
});

export const {
	setMinPriceFilter,
	setMaxPriceFilter,
	setCategory,
	setBrandFilter,
} = filterSlice.actions;
