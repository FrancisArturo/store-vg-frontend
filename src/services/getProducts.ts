import type { Product, ApiGetProductsRes } from "../types";

const API_URL = "http://localhost:3000/api/products/";

export const getProducts = async (
	page: number,
	category?: string,
): Promise<[Error?, Product[]?]> => {
	try {
		const res = await fetch(`${API_URL}?page=${page}&cat=${category}`);
		if (!res.ok) throw new Error("fetching data error");
		const data = (await res.json()) as ApiGetProductsRes;
		console.log(data);
		return [undefined, data.products.docs];
	} catch (error) {
		if (error instanceof Error) return [error];
	}

	return [new Error("Unknown Error")];
};
