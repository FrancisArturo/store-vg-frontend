import type { ApiGetProductRes, Product } from "../types";

const API_URL = "http://localhost:3000/api/products/product/";

export const getProduct = async (sku: string): Promise<[Error?, Product?]> => {
	try {
		console.log("llamada getProduct");
		const res = await fetch(`${API_URL}${sku}`);
		if (!res.ok) throw new Error("fetching data error");
		const data = (await res.json()) as ApiGetProductRes;
		return [undefined, data.product];
	} catch (error) {
		if (error instanceof Error) return [error];
	}

	return [new Error("Unknown Error")];
};
