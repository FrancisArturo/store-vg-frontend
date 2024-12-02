import {
	setBrandFilter,
	setCategory,
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

	return {
		addMinPriceFilter,
		addMaxPriceFilter,
		addCategoryFilter,
		addBrandFilter,
		handleCurrentPage,
	};
};
