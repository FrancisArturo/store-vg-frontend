import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
import { ProductItem } from "./ProductItem";
import { Filters } from "./Filters";
import { useProductsActions } from "../hooks/useProductsActions";
import { useEffect } from "react";

export const ProductsList: React.FC = () => {
	const { products, isLoading, categories, currentPage } = useAppSelector(
		(state) => state.products,
	);
	const { brand, minPrice, maxPrice } = useAppSelector(
		(state) => state.filters,
	);

	const { handleCurrentPage, getAllProducts } = useProductsActions();

	const { cat } = useParams();

	const categorySelected = cat
		? categories.find((item) => item.title.toLowerCase() === cat)
		: { title: "All Products", quantity: products.length };

	const filteredProducts = products.filter((product) => {
		return (
			// (!cat || product.category === category?.title) &&
			product.price > minPrice &&
			(maxPrice === 0 || product.price < maxPrice) &&
			(!brand || product.brand === brand)
		);
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getAllProducts(currentPage, cat);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	return (
		<>
			{categorySelected?.title !== "All Products" && (
				<nav aria-label="Breadcrumb" className="mt-6">
					<ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
						<li>
							<div className="flex items-center">
								<a
									href="/products"
									className="mr-2 text-sm font-medium text-gray-900"
								>
									All Products
								</a>
								<svg
									fill="currentColor"
									width={16}
									height={20}
									viewBox="0 0 16 20"
									aria-hidden="true"
									className="h-5 w-4 text-gray-300"
								>
									<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
								</svg>
							</div>
						</li>
						<li className="text-sm">
							<p
								aria-current="page"
								className="font-medium text-gray-500 hover:text-gray-600"
							>
								{categorySelected?.title}
							</p>
						</li>
					</ol>
				</nav>
			)}
			{!isLoading && filteredProducts.length !== 0 && (
				<Filters
					products={filteredProducts}
					category={categorySelected}
					isLoading={isLoading}
				/>
			)}

			{!isLoading && filteredProducts.length === 0 && <p>Products not found</p>}
			{categorySelected && (
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{filteredProducts.map((product) => (
							<ProductItem product={product} key={product.sku} />
						))}
					</div>
					<button
						type="button"
						onClick={() => handleCurrentPage(currentPage + 1)}
					>
						More
					</button>
				</div>
			)}
		</>
	);
};
