import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	minPrice: 0,
	maxPrice: 0,
	brand: "",
};

// type Name = 'minPrice' | 'brand'

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
		setBrandFilter: (state, action: PayloadAction<string>) => {
			state.brand = action.payload;
		},
	},
});

export const { setMinPriceFilter, setMaxPriceFilter, setBrandFilter } =
	filterSlice.actions;
