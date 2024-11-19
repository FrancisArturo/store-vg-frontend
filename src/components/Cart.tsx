import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCartActions } from "../hooks/useCartActions";
import { useAppSelector } from "../hooks/store";
import { useEffect } from "react";
import { saveCartLocalStorage } from "../services/saveCart";

import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";

// const products = [
// 	{
// 		id: 1,
// 		name: "Throwback Hip Bag",
// 		href: "#",
// 		color: "Salmon",
// 		price: "$90.00",
// 		quantity: 1,
// 		imageSrc:
// 			"https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
// 		imageAlt:
// 			"Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
// 	},
// 	{
// 		id: 2,
// 		name: "Medium Stuff Satchel",
// 		href: "#",
// 		color: "Blue",
// 		price: "$32.00",
// 		quantity: 1,
// 		imageSrc:
// 			"https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
// 		imageAlt:
// 			"Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
// 	},
// 	// More products...
// ];

export const Cart: React.FC = () => {
	const { isOpen, cartProducts, amount } = useAppSelector(
		(state) => state.cart,
	);
	const {
		setIsOpenCart,
		setCartAmount,
		deleteCartProduct,
		addQuantityProduct,
		decreaseQuantityProduct,
	} = useCartActions();

	useEffect(() => {
		setCartAmount(cartProducts);
		saveCartLocalStorage({
			cartProducts: cartProducts,
			amount,
			isOpen: false,
		});
	}, [cartProducts, amount, setCartAmount]);

	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpenCart(false)}
			className="relative"
		>
			<DialogBackdrop
				transition
				className="fixed z-20 inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
			/>

			<div className="fixed inset-0 overflow-hidden z-30">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
						<DialogPanel
							transition
							className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
						>
							<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
								<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
									<div className="flex items-start justify-between">
										<DialogTitle className="text-lg font-medium text-gray-900">
											Shopping cart
										</DialogTitle>
										<div className="ml-3 flex h-7 items-center">
											<button
												type="button"
												onClick={() => setIsOpenCart(false)}
												className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
											>
												<span className="absolute -inset-0.5" />
												<span className="sr-only">Close panel</span>
												<XMarkIcon aria-hidden="true" className="h-6 w-6" />
											</button>
										</div>
									</div>

									<div className="mt-8">
										<div className="flow-root">
											<ul className="-my-6 divide-y divide-gray-200">
												{cartProducts.length === 0 && <p>Your cart is empty</p>}
												{cartProducts.map((product) => (
													<li key={product.id} className="flex py-6">
														<div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
															<img
																alt={product.title}
																src={product.thumbnail}
																className="h-full w-full object-cover object-center"
															/>
														</div>

														<div className="ml-4 flex flex-1 flex-col">
															<div>
																<div className="flex justify-between text-base font-medium text-gray-900">
																	<h3>
																		<a href={`/product/${product.sku}`}>
																			{product.title}
																		</a>
																	</h3>
																	<p className="ml-4">${product.price}</p>
																</div>
																<p className="mt-1 text-sm text-gray-500">
																	{/* {product.color} */}
																</p>
															</div>
															<div className="flex flex-1 items-end justify-between text-sm">
																<div className="flex justify-center items-center gap-2">
																	<p>Qty:</p>
																	<button
																		type="button"
																		onClick={() =>
																			decreaseQuantityProduct(product.id)
																		}
																		disabled={product.quantity === 1}
																	>
																		{product.quantity === 1 ? (
																			<AiOutlineMinusSquare className="text-2xl text-gray-300" />
																		) : (
																			<AiOutlineMinusSquare className="text-2xl" />
																		)}
																	</button>
																	<p className="text-black m-1 text-2xl">
																		{product.quantity}
																	</p>
																	<button
																		type="button"
																		onClick={() =>
																			addQuantityProduct(product.id)
																		}
																	>
																		<AiOutlinePlusSquare className="text-2xl" />
																	</button>
																</div>

																<div className="flex">
																	<button
																		type="button"
																		className="font-medium text-gray-500 hover:text-gray-700"
																		onClick={() =>
																			deleteCartProduct(product.id)
																		}
																	>
																		Remove
																	</button>
																</div>
															</div>
														</div>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>

								<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
									<div className="flex justify-between text-base font-medium text-gray-900">
										<p>Subtotal</p>
										<p>${amount}</p>
									</div>
									<p className="mt-0.5 text-sm text-gray-500">
										Shipping and taxes calculated at checkout.
									</p>
									<div className="mt-6">
										{cartProducts.length === 0 ? (
											<a
												href="#/"
												className="flex items-center justify-center rounded-md border border-transparent bg-gray-300 px-6 py-3 text-base font-medium text-white shadow-sm cursor-default"
											>
												Checkout
											</a>
										) : (
											<a
												href="/checkout"
												className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 duration-500"
											>
												Checkout
											</a>
										)}
									</div>
									<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
										<p>
											or{" "}
											<button
												type="button"
												onClick={() => setIsOpenCart(false)}
												className="font-medium text-gray-600 hover:text-gray-500"
											>
												Continue Shopping
												<span aria-hidden="true"> &rarr;</span>
											</button>
										</p>
									</div>
								</div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	);
};
