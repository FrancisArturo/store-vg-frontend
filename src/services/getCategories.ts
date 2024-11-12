import type { ApiGetCategoriesRes, CategoryFound } from "../types";

const API_URL = "http://localhost:3000/api/products/categories";

export const getCategories = async (): Promise<[Error?, CategoryFound[]?]> => {
	try {
		const res = await fetch(API_URL);
		const data = (await res.json()) as ApiGetCategoriesRes;
		return [undefined, data.categoriesFound];
	} catch (error) {
		if (error instanceof Error) return [error];
	}

	return [new Error("Unknown Error")];
};
