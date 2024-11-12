import type { Product, ApiGetProductsRes } from "../types";

const API_URL = "http://localhost:3000/api/products";

export const getProducts = async (): Promise<[Error?, Product[]?]> => {
	try {
		const res = await fetch(API_URL);
		if (!res.ok) throw new Error("fetching data error");
		const data = (await res.json()) as ApiGetProductsRes;
		return [undefined, data.products];
	} catch (error) {
		if (error instanceof Error) return [error];
	}

	return [new Error("Unknown Error")];
};
