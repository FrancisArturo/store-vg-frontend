import type { Brand, Product } from "../types";

export const searchBrands = (products: Product[]) => {
	const brandsFound: Brand[] = [];

	//mapeando las categorias encontradas en los productos
	products.map((product) => {
		const checkBrand = brandsFound.find((item) => item.title === product.brand);
		if (checkBrand) {
			return;
		}
		brandsFound.push({
			title: product.brand,
			quantity: 0,
		});
	});

	//contando la cantidad de productos que tiene cada una de las categorias
	for (const brand of brandsFound) {
		products.map((product) => {
			if (brand.title === product.brand) {
				brand.quantity++;
			}
		});
	}

	return brandsFound;
};
