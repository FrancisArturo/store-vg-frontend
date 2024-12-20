import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
import { ProductItem } from "./ProductItem";
import { Filters } from "./Filters";
import { useProductsActions } from "../hooks/useProductsActions";
import { useEffect } from "react";
import { useFiltersActions } from "../hooks/useFiltersActions";
import debounce from "just-debounce-it";
import {
	saveCurrencyLocalStorage,
	saveFiltersLocalStorage,
} from "../services/filtersLocalStorage";

export const ProductsList: React.FC = () => {
	const {
		products,
		isLoading,
		categories,
		hasNextPage,
		totalProductsWithQuery,
	} = useAppSelector((state) => state.products);
	const { brand, minPrice, maxPrice, currentPage, currency } = useAppSelector(
		(state) => state.filters,
	);

	const { getAllProducts } = useProductsActions();
	const { handleCurrentPage } = useFiltersActions();

	const { cat } = useParams();

	const categorySelected = cat
		? categories.find((item) => item.title.toLowerCase() === cat)
		: { title: "All Products", quantity: 37 };

	const handleScroll = debounce(() => {
		if (
			document.body.scrollHeight - 300 < window.scrollY + window.innerHeight &&
			hasNextPage
		) {
			handleCurrentPage(currentPage + 1);
		}
	}, 500);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getAllProducts(currentPage, currency, cat, brand, minPrice, maxPrice);
		saveCurrencyLocalStorage(currency);
		saveFiltersLocalStorage({
			currentPage: 1,
			brand,
			minPrice,
			maxPrice,
		});
		return localStorage.removeItem("filters");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, brand, minPrice, maxPrice, currency, cat]);

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
			{categorySelected && (
				<div className="flex mx-auto max-w-2xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900">
						{categorySelected.title}
					</h1>
					<p className="font-medium ml-2">{categorySelected.quantity}</p>
				</div>
			)}

			<Filters
				totalProductsWithQuery={totalProductsWithQuery}
				isLoading={isLoading}
			/>

			{!isLoading && products.length === 0 && <p>Products not found</p>}
			{categorySelected && (
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					{isLoading && products.length === 0 && (
						<div className="w-[100%] flex justify-center">
							<svg
								aria-hidden="true"
								className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300 ml-3"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
							<span className="sr-only">Loading...</span>
						</div>
					)}
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{products.map((product) => (
							<ProductItem product={product} key={product.sku} />
						))}
					</div>
					{isLoading && hasNextPage && (
						<div className="w-[100%] flex justify-center mt-5">
							<svg
								aria-hidden="true"
								className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300 ml-3"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
							<span className="sr-only">Loading...</span>
						</div>
					)}
				</div>
			)}
		</>
	);
};
