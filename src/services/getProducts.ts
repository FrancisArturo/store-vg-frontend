import type { Product, ApiGetProductsRes } from "../types";

const API_URL = "http://localhost:3000/api/products/";

export const getProducts = async (
	page: number,
	category?: string,
	brand?: string,
	minPrice?: number,
	maxPrice?: number,
): Promise<[Error?, Product[]?, boolean?, Product[]?]> => {
	try {
		const res = await fetch(
			`${API_URL}?page=${page}&cat=${category}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
		);
		if (!res.ok) throw new Error("fetching data error");
		const data = (await res.json()) as ApiGetProductsRes;
		console.log(data);
		return [
			undefined,
			data.products.docs,
			data.products.hasNextPage,
			data.totalProducts,
		];
	} catch (error) {
		if (error instanceof Error) return [error];
	}

	return [new Error("Unknown Error")];
};
