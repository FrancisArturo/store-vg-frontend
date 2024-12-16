import {
	setBrandFilter,
	setCategory,
	setCurrency,
	setCurrentPage,
	setMaxPriceFilter,
	setMinPriceFilter,
} from "../store/filters/slice";
import { useAppDispatch } from "./store";

export const useFiltersActions = () => {
	const dispatch = useAppDispatch();

	const addMinPriceFilter = (filter: number) => {
		dispatch(setMinPriceFilter(filter));
	};
	const addMaxPriceFilter = (filter: number) => {
		dispatch(setMaxPriceFilter(filter));
	};

	const addCategoryFilter = (filter: string) => {
		dispatch(setCategory(filter));
	};

	const addBrandFilter = (filter: string) => {
		dispatch(setBrandFilter(filter));
	};

	const handleCurrentPage = (value: number) => {
		dispatch(setCurrentPage(value));
	};

	const changeCurrency = (value: string) => {
		dispatch(setCurrency(value));
	};

	return {
		addMinPriceFilter,
		addMaxPriceFilter,
		addCategoryFilter,
		addBrandFilter,
		handleCurrentPage,
		changeCurrency,
	};
};
