import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
import { ProductItem } from "./ProductItem";
import { Filters } from "./Filters";

export const ProductsList: React.FC = () => {
	const { products, isLoading, categories } = useAppSelector(
		(state) => state.products,
	);
	const { brand, minPrice, maxPrice } = useAppSelector(
		(state) => state.filters,
	);
	const { cat } = useParams();

	const category = cat
		? categories.find((item) => item.title.toLowerCase() === cat)
		: { title: "All Products", quantity: products.length };

	const filteredProducts = products.filter((product) => {
		return (
			(!cat || product.category === category?.title) &&
			product.price > minPrice &&
			(maxPrice === 0 || product.price < maxPrice) &&
			(!brand || product.brand === brand)
		);
	});

	return (
		<>
			{category && category.title !== "All Products" && (
				<nav aria-label="Breadcrumb">
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
								{category.title}
							</p>
						</li>
					</ol>
				</nav>
			)}

			<Filters
				products={filteredProducts}
				category={category}
				isLoading={isLoading}
			/>
			{!category && !isLoading && <p>Category not found</p>}
			{category && (
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{filteredProducts.map((product) => (
							<ProductItem product={product} key={product.id} />
						))}
					</div>
				</div>
			)}
		</>
	);
};
