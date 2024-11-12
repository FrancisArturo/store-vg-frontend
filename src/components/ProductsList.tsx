import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
import { ProductItem } from "./ProductItem";
// import { ProductItem } from "./ProductItem";
// import { Filters } from "./Filters";

export const ProductsList: React.FC = () => {
	const { products, isLoading, categories } = useAppSelector(
		(state) => state.products,
	);
	const { brand, minPrice } = useAppSelector((state) => state.filters);
	const { cat } = useParams();

	const category = categories.find((item) => item.title.toLowerCase() === cat);

	const filteredProducts = products.filter((product) => {
		return (
			(!cat || product.category === category?.title) &&
			product.price > minPrice &&
			(!brand || product.brand === brand)
		);
	});

	// return (
	// 	<>
	// 		<h2>{cat}</h2>
	// 		{isLoading && <p>Cargando...</p>}
	// 		<Filters products={filteredProducts} />
	// 		{filteredProducts.length === 0 && <p>Products not found</p>}
	// 		{filteredProducts.length > 0 && (
	// 			<ul className="productList">
	// 				{filteredProducts.map((product, index) => (
	// 					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
	// 					<ProductItem product={product} key={index} />
	// 				))}
	// 			</ul>
	// 		)}
	// 	</>
	// );
	return (
		<>
			{!category && !isLoading && <p>Category not found</p>}
			{category && (
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<p className="text-5xl text-gray-500 mb-9">{category.title} </p>
					<h2 className="sr-only">{category.title}</h2>

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