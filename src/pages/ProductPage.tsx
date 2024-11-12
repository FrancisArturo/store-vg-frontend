// import { useParams } from "react-router-dom";
// import type { Product } from "../types";
// import { useAppSelector } from "../hooks/store";
// import { useEffect, useState } from "react";
// import { useCartActions } from "../hooks/useCartActions";
// import { useCheckCartProduct } from "../hooks/useCheckCartProduct";

// export const ProductPage: React.FC = () => {
// 	const { pid } = useParams();
// 	const { products } = useAppSelector((state) => state.products);
// 	const { isProductInCart } = useCheckCartProduct();
// 	const { addProductToCart } = useCartActions();
// 	const [product, setProduct] = useState<Product>();
// 	const [error, setError] = useState("");

// 	const getProduct = () => {
// 		console.log("llamada getProduct");
// 		return products.find((product) => product.sku === pid);
// 	};

// 	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
// 	useEffect(() => {
// 		if (products.length > 0) {
// 			const product = getProduct();
// 			if (product) return setProduct(product);
// 			return setError("Product not found");
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [pid, products]);

// 	return (
// 		<>
// 			{error.length > 0 && <p>{error}</p>}
// 			{error.length === 0 && product && (
// 				<div className="product-detail-container">
// 					<div>
// 						<img src={product.images[0]} alt={product.title} />
// 					</div>
// 					<div>
// 						<p>{product.title} </p>
// 						<p>{product.description}</p>
// 						<p>${product.price}</p>
// 						{isProductInCart(product) ? (
// 							<button type="button" disabled>
// 								Already in cart
// 							</button>
// 						) : (
// 							<button type="button" onClick={() => addProductToCart(product)}>
// 								Add to Cart
// 							</button>
// 						)}
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// };

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
"use client";

import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useAppSelector } from "../hooks/store";
import { useParams } from "react-router-dom";
import { useCheckCartProduct } from "../hooks/useCheckCartProduct";
import type { Product } from "../types";

const product = {
	name: "Basic Tee 6-Pack",
	price: "$192",
	href: "#",
	breadcrumbs: [
		{ id: 1, name: "Men", href: "#" },
		{ id: 2, name: "Clothing", href: "#" },
	],
	images: [
		{
			src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
			alt: "Two each of gray, white, and black shirts laying flat.",
		},
		{
			src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
			alt: "Model wearing plain black basic tee.",
		},
		{
			src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
			alt: "Model wearing plain gray basic tee.",
		},
		{
			src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
			alt: "Model wearing plain white basic tee.",
		},
	],
	colors: [
		{ name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
		{ name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
		{ name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
	],
	sizes: [
		{ name: "XXS", inStock: false },
		{ name: "XS", inStock: true },
		{ name: "S", inStock: true },
		{ name: "M", inStock: true },
		{ name: "L", inStock: true },
		{ name: "XL", inStock: true },
		{ name: "2XL", inStock: true },
		{ name: "3XL", inStock: true },
	],
	description:
		'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
	highlights: [
		"Hand cut and sewn locally",
		"Dyed with our proprietary colors",
		"Pre-washed & pre-shrunk",
		"Ultra-soft 100% cotton",
	],
	details:
		'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export const ProductPage = () => {
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);
	const [productFound, setProductFound] = useState<Product>();
	const [indexSlide, setIndexSlide] = useState(0);

	const { pid } = useParams();
	const { products: productsFound } = useAppSelector((state) => state.products);

	const { isProductInCart } = useCheckCartProduct();

	const getProduct = () => {
		console.log("llamada getProduct");
		return productsFound.find((product) => product.sku === pid);
	};

	const prevSlide = () => {
		if (indexSlide === 0) return;
		setIndexSlide(indexSlide - 1);
	};

	const nextSlide = () => {
		if (!productFound?.images) return;
		if (indexSlide === productFound?.images.length - 1) return;
		setIndexSlide(indexSlide + 1);
	};

	const isItemSelectedSlider = (index: number) => {
		return indexSlide === index;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (productsFound.length > 0) {
			const product = getProduct();
			if (product) return setProductFound(product);
			// return setError("Product not found");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pid, productsFound]);

	return (
		<>
			{productFound && (
				<div>
					<div className="pt-6">
						<nav aria-label="Breadcrumb">
							<ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
								{product.breadcrumbs.map((breadcrumb) => (
									<li key={breadcrumb.id}>
										<div className="flex items-center">
											<a
												href={breadcrumb.href}
												className="mr-2 text-sm font-medium text-gray-900"
											>
												{breadcrumb.name}
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
								))}
								<li className="text-sm">
									<a
										href={product.href}
										aria-current="page"
										className="font-medium text-gray-500 hover:text-gray-600"
									>
										{product.name}
									</a>
								</li>
							</ol>
						</nav>

						{/* Product info */}
						<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
							<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
								<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
									{productFound?.title}
								</h1>
							</div>

							{/* Options */}
							<div className="mt-4 lg:row-span-3 lg:mt-0">
								<h2 className="sr-only">Product information</h2>
								<p className="text-3xl tracking-tight text-gray-900">
									${productFound?.price}
								</p>

								{/* Reviews */}
								<div className="mt-6">
									<h3 className="sr-only">Reviews</h3>
									<div className="flex items-center">
										<div className="flex items-center">
											{[0, 1, 2, 3, 4].map((rating) => (
												<StarIcon
													key={rating}
													aria-hidden="true"
													className={classNames(
														productFound.rating > rating
															? "text-gray-900"
															: "text-gray-200",
														"h-5 w-5 shrink-0",
													)}
												/>
											))}
										</div>
										<p className="sr-only">
											{productFound.rating} out of 5 stars
										</p>
										<a
											href={reviews.href}
											className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
										>
											{reviews.totalCount} reviews
										</a>
									</div>
								</div>

								<form className="mt-10">
									{/* Colors */}
									<div>
										<h3 className="text-sm font-medium text-gray-900">Color</h3>

										<fieldset aria-label="Choose a color" className="mt-4">
											<RadioGroup
												value={selectedColor}
												onChange={setSelectedColor}
												className="flex items-center space-x-3"
											>
												{product.colors.map((color) => (
													<Radio
														key={color.name}
														value={color}
														aria-label={color.name}
														className={classNames(
															color.selectedClass,
															"relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1",
														)}
													>
														<span
															aria-hidden="true"
															className={classNames(
																color.class,
																"h-8 w-8 rounded-full border border-black border-opacity-10",
															)}
														/>
													</Radio>
												))}
											</RadioGroup>
										</fieldset>
									</div>
									<div className="mt-14">
										<p>{productFound?.description}</p>
									</div>
									{isProductInCart(productFound) ? (
										<button
											type="submit"
											className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											disabled
										>
											Already in Cart
										</button>
									) : (
										<button
											type="submit"
											className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											Add to Cart
										</button>
									)}
								</form>
							</div>

							<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
								<div className="max-w-[600px] h-[600px] w-full m-auto pb-16 px-4 relative group">
									<div
										style={{
											backgroundImage: `url(${productFound?.images[indexSlide]})`,
										}}
										className="w-full h-full rounded-2xl bg-center bg-cover duration-500 bg-gray-200"
									/>
									<div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black text-white cursor-pointer">
										<BsChevronCompactLeft onClick={() => prevSlide()} />
									</div>
									<div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black text-white cursor-pointer">
										<BsChevronCompactRight onClick={() => nextSlide()} />
									</div>
									<div className="flex w-[100%] h-[100%] flex-wrap mt-10">
										{productFound?.images.map((image, index) => (
											<div
												className="h-[115px] max-h-[64px] relative w-[20%] ml-0 mr-10 mb-8 mt-0"
												key={index}
											>
												{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
												<img
													src={image}
													alt=""
													className={
														index === indexSlide
															? "bg-gray-200"
															: "bg-gray-200 opacity-[.5]"
													}
													onClick={() => setIndexSlide(index)}
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
