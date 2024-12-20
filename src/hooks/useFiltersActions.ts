import {
	setBrandFilter,
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
		addBrandFilter,
		handleCurrentPage,
		changeCurrency,
	};
};
