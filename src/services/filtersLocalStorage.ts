interface Filters {
	currentPage: number;
	brand: string;
	minPrice: number;
	maxPrice: number;
}

export const saveFiltersLocalStorage = (filters: Filters) => {
	console.log(filters);
	const data = JSON.stringify(filters);
	localStorage.setItem("filters", data);
};

export const saveCurrencyLocalStorage = (currency: string) => {
	const data = JSON.stringify(currency);
	localStorage.setItem("curr", data);
};

export const getFiltersLocalStorage = () => {
	const data = localStorage.getItem("filters");
	const curr = localStorage.getItem("curr");
	const currency = JSON.parse(curr as string);
	if (data) {
		const filters = JSON.parse(data);
		return {
			...filters,
			currency: curr ? currency : "usd",
		};
	}
	return {
		currentPage: 1,
		currency: curr ? currency : "usd",
		brand: "",
		minPrice: 0,
		maxPrice: 0,
	};
};
