import type { CheckoutData } from "../types";

const API_URL = "http://localhost:3000/api/checkout";

export const sendCheckoutData = async (
	data: CheckoutData,
): Promise<[Error?, Data?]> => {
	try {
		const res = await fetch(API_URL, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!res.ok) throw new Error("Completing purchase error");
		const json = await res.json();
		return [undefined, json];
	} catch (error) {
		if (error instanceof Error) return [error];
	}

	return [new Error("Unknown Error")];
};
