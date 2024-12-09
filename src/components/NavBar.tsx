import { Fragment, useRef, useState } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
} from "@headlessui/react";
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartActions } from "../hooks/useCartActions";
import { useAppSelector } from "../hooks/store";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { useClickOutside } from "../hooks/useClickOutside";

const navigation = {
	categories: [
		// {
		// 	id: "women",
		// 	name: "Women",
		// 	featured: [
		// 		{
		// 			name: "New Arrivals",
		// 			href: "#",
		// 			imageSrc:
		// 				"https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg",
		// 			imageAlt:
		// 				"Models sitting back to back, wearing Basic Tee in black and bone.",
		// 		},
		// 		{
		// 			name: "Basic Tees",
		// 			href: "#",
		// 			imageSrc:
		// 				"https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg",
		// 			imageAlt:
		// 				"Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
		// 		},
		// 	],
		// 	sections: [
		// 		{
		// 			id: "clothing",
		// 			name: "Clothing",
		// 			items: [
		// 				{ name: "Tops", href: "#" },
		// 				{ name: "Dresses", href: "#" },
		// 				{ name: "Pants", href: "#" },
		// 				{ name: "Denim", href: "#" },
		// 				{ name: "Sweaters", href: "#" },
		// 				{ name: "T-Shirts", href: "#" },
		// 				{ name: "Jackets", href: "#" },
		// 				{ name: "Activewear", href: "#" },
		// 				{ name: "Browse All", href: "#" },
		// 			],
		// 		},
		// 		{
		// 			id: "accessories",
		// 			name: "Accessories",
		// 			items: [
		// 				{ name: "Watches", href: "#" },
		// 				{ name: "Wallets", href: "#" },
		// 				{ name: "Bags", href: "#" },
		// 				{ name: "Sunglasses", href: "#" },
		// 				{ name: "Hats", href: "#" },
		// 				{ name: "Belts", href: "#" },
		// 			],
		// 		},
		// 		{
		// 			id: "brands",
		// 			name: "Brands",
		// 			items: [
		// 				{ name: "Full Nelson", href: "#" },
		// 				{ name: "My Way", href: "#" },
		// 				{ name: "Re-Arranged", href: "#" },
		// 				{ name: "Counterfeit", href: "#" },
		// 				{ name: "Significant Other", href: "#" },
		// 			],
		// 		},
		// 	],
		// },
		{
			id: "men",
			name: "Men",
			featured: [
				{
					name: "New Arrivals",
					href: "#",
					imageSrc:
						"https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
					imageAlt:
						"Drawstring top with elastic loop closure and textured interior padding.",
				},
				{
					name: "Artwork Tees",
					href: "#",
					imageSrc:
						"https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg",
					imageAlt:
						"Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
				},
			],
			sections: [
				{
					id: "clothing",
					name: "Clothing",
					items: [
						{ name: "Tops", href: "#" },
						{ name: "Pants", href: "#" },
						{ name: "Sweaters", href: "#" },
						{ name: "T-Shirts", href: "#" },
						{ name: "Jackets", href: "#" },
						{ name: "Activewear", href: "#" },
						{ name: "Browse All", href: "#" },
					],
				},
				{
					id: "accessories",
					name: "Accessories",
					items: [
						{ name: "Watches", href: "#" },
						{ name: "Wallets", href: "#" },
						{ name: "Bags", href: "#" },
						{ name: "Sunglasses", href: "#" },
						{ name: "Hats", href: "#" },
						{ name: "Belts", href: "#" },
					],
				},
				{
					id: "brands",
					name: "Brands",
					items: [
						{ name: "Re-Arranged", href: "#" },
						{ name: "Counterfeit", href: "#" },
						{ name: "Full Nelson", href: "#" },
						{ name: "My Way", href: "#" },
					],
				},
			],
		},
	],
	pages: [
		{ name: "Company", href: "#" },
		{ name: "Stores", href: "#" },
	],
};

const navbarCatImages = [
	{
		image: "https://i.imgur.com/yEi6zUm.png",
		title: "Smartphones",
	},
	{
		image: "https://i.imgur.com/FO8qiO2.png",
		title: "Laptops",
	},
	{
		image: "https://i.imgur.com/uruInAC.png",
		title: "Mobile-Accessories",
	},
	{
		image: "https://i.imgur.com/weAZuf4.png",
		title: "Tablets",
	},
];

export const NavBar: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [openSearchBar, setOpenSearchBar] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const { cartProducts } = useAppSelector((state) => state.cart);
	const { categories: categoriesFound } = useAppSelector(
		(state) => state.products,
	);
	const { setIsOpenCart } = useCartActions();
	const [catSelected, setCatSelected] = useState("");

	const onClickCloseSearch = () => {
		setOpenSearchBar(false);
	};

	useClickOutside(ref, onClickCloseSearch);

	return (
		<>
			<div className="bg-white">
				{/* Mobile menu */}
				<Dialog
					open={open}
					onClose={setOpen}
					className="relative z-40 lg:hidden"
				>
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
					/>

					<div className="fixed inset-0 z-40 flex">
						<DialogPanel
							transition
							className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
						>
							<div className="flex px-4 pb-2 pt-5">
								<button
									type="button"
									onClick={() => setOpen(false)}
									className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
								>
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Close menu</span>
									<XMarkIcon aria-hidden="true" className="h-6 w-6" />
								</button>
							</div>

							{/* Links */}
							<TabGroup className="mt-2">
								<div className="border-b border-gray-200">
									<TabList className="-mb-px flex space-x-8 px-4">
										<Tab className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600">
											Categories
										</Tab>
									</TabList>
								</div>
								<TabPanels as={Fragment}>
									{navigation.categories.map((category) => (
										<TabPanel
											key={category.name}
											className="space-y-10 px-4 pb-8 pt-10"
										>
											<div className="grid grid-cols-2 gap-x-4 gap-y-4">
												{navbarCatImages.map((item) => (
													<div
														key={item.title}
														className="group relative text-sm"
													>
														<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
															<img
																alt={item.title}
																src={item.image}
																className="object-cover object-center"
															/>
														</div>
														<a
															href="{item.href}"
															className="mt-6 block font-medium text-gray-900"
														>
															<span
																aria-hidden="true"
																className="absolute inset-0 z-10"
															/>
															{item.title}
														</a>
														<p aria-hidden="true" className="mt-1">
															Shop now
														</p>
													</div>
												))}
											</div>
										</TabPanel>
									))}
								</TabPanels>
							</TabGroup>

							<div className="space-y-6 border-t border-gray-200 px-4 py-6">
								{navigation.pages.map((page) => (
									<div key={page.name} className="flow-root">
										<a
											href={page.href}
											className="-m-2 block p-2 font-medium text-gray-900"
										>
											{page.name}
										</a>
									</div>
								))}
							</div>

							{/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
								<div className="flow-root">
									<a
										href="#"
										className="-m-2 block p-2 font-medium text-gray-900"
									>
										Sign in
									</a>
								</div>
								<div className="flow-root">
									<a
										href="#"
										className="-m-2 block p-2 font-medium text-gray-900"
									>
										Create account
									</a>
								</div>
							</div> */}

							<div className="border-t border-gray-200 px-4 py-6">
								<a href="#" className="-m-2 flex items-center p-2">
									<img
										alt=""
										src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
										className="block h-auto w-5 shrink-0"
									/>
									<span className="ml-3 block text-base font-medium text-gray-900">
										USD
									</span>
									<span className="sr-only">, change currency</span>
								</a>
							</div>
						</DialogPanel>
					</div>
				</Dialog>

				<header className="relative bg-white">
					<p className="flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
						Get free delivery on orders over $100
					</p>

					<nav
						aria-label="Top"
						className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
					>
						<div className="border-b border-gray-200">
							<div className="flex h-16 items-center">
								<button
									type="button"
									onClick={() => setOpen(true)}
									className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
								>
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open menu</span>
									<Bars3Icon aria-hidden="true" className="h-6 w-6" />
								</button>

								{/* Logo */}
								<div className="ml-4 flex lg:ml-0">
									<a href="/">
										<span className="sr-only">Your Company</span>
										<img
											alt=""
											src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
											className="h-8 w-auto"
										/>
									</a>
								</div>

								{/* Flyout menus */}
								<PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
									<div className="flex h-full space-x-8">
										{navigation.categories.map((category) => (
											<Popover key={category.name} className="flex">
												<div className="relative flex">
													<PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
														Categories
													</PopoverButton>
												</div>

												<PopoverPanel
													transition
													className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-0 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
												>
													{/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
													<div
														aria-hidden="true"
														className="absolute inset-0 top-1/2 bg-white shadow"
													/>

													<div className="relative bg-black z-20">
														<div className="mx-auto max-w-7xl px-8">
															<div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
																<div className="grid grid-cols-2 h-[500px] gap-3">
																	{navbarCatImages.map((item) => (
																		<div
																			key={item.title}
																			style={{
																				backgroundImage: `url(${item.image})`,
																			}}
																			className={
																				catSelected.length === 0 ||
																				catSelected === item.title
																					? "bg-cover bg-white duration-300 rounded-lg"
																					: "bg-cover bg-white opacity-10 duration-300 rounded-lg"
																			}
																		/>
																	))}
																</div>

																<div className="flex flex-col row-start-1 text-5xl gap-20 justify-start font-medium">
																	{categoriesFound.map((category, index) => (
																		// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
																		<div key={index} className="flex">
																			{/* biome-ignore lint/a11y/useKeyWithMouseEvents: <explanation> */}
																			<a
																				href={`/products/${category.title.toLowerCase()}`}
																				className="hover:text-gray-50 cursor-pointer flex"
																				onMouseEnter={() =>
																					setCatSelected(category.title)
																				}
																				onMouseOut={() => setCatSelected("")}
																			>
																				<p>{category.title}</p>
																			</a>
																			<p
																				className={
																					catSelected === category.title
																						? "text-xs text-gray-50 ml-1"
																						: "text-xs ml-1"
																				}
																			>
																				{category.quantity}
																			</p>
																		</div>
																	))}
																</div>
															</div>
														</div>
													</div>
												</PopoverPanel>
											</Popover>
										))}

										{navigation.pages.map((page) => (
											<a
												key={page.name}
												href={page.href}
												className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
											>
												{page.name}
											</a>
										))}
									</div>
								</PopoverGroup>

								<div className="ml-auto flex items-center">
									<div className="hidden lg:ml-8 lg:flex">
										<a
											href="#"
											className="flex items-center text-gray-700 hover:text-gray-800"
										>
											<img
												alt=""
												src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
												className="block h-auto w-5 shrink-0"
											/>
											<span className="ml-3 block text-sm font-medium">
												USD
											</span>
											<span className="sr-only">, change currency</span>
										</a>
									</div>

									{/* Search */}
									<div className="flex lg:ml-6">
										<button
											type="button"
											className="p-2 text-gray-400 hover:text-gray-500"
											onClick={() => setOpenSearchBar(!openSearchBar)}
										>
											<span className="sr-only">Search</span>
											<MagnifyingGlassIcon
												aria-hidden="true"
												className="h-6 w-6"
											/>
										</button>
									</div>

									{/* Cart */}
									<div className="ml-4 flow-root lg:ml-6">
										<button
											type="button"
											className="group -m-2 flex items-center p-2"
											onClick={() => setIsOpenCart(true)}
										>
											<ShoppingCartIcon
												aria-hidden="true"
												className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500"
											/>
											<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
												{cartProducts.length}
											</span>
											<span className="sr-only">items in cart, view bag</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</nav>
				</header>
			</div>
			{openSearchBar && (
				<div className="flex flex-col items-end mx-auto lg:max-w-7xl" ref={ref}>
					<div className="w-[350px] z-10 absolute">
						<input
							type="text"
							placeholder="item"
							className="w-[100%] rounded-sm bg-gray-200 py-1 px-3"
						/>

						<div className="w-[350px] absolute top[100%] bg-white border-2 border-gray-400 z-10">
							<ul>
								<li className="flex p-4 border-gray-200 hover:bg-gray-200 cursor-pointer">
									<a
										className="h-16 w-16 rounded-md border border-gray-200 bg-white"
										href="/product/AZ1L68SM"
									>
										<img
											src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/thumbnail.png"
											alt="iphone x"
										/>
									</a>
									<div className="ml-8 flex flex-col justify-between">
										<p>Title: Lorem, ipsum.</p>
										<p>Price: $ 200</p>
									</div>
								</li>
								<li className="flex p-4  border-t-2 border-gray-200 hover:bg-gray-200">
									<div className="h-16 w-16 rounded-md border border-gray-200 bg-white">
										<img
											src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/thumbnail.png"
											alt="iphone x"
										/>
									</div>
									<div className="ml-8 flex flex-col justify-between">
										<p>Title: Lorem, ipsum.</p>
										<p>Price: $ 200</p>
									</div>
								</li>
								<li className="flex p-4  border-t-2 bborder-gray-200 hover:bg-gray-200">
									<div className="h-16 w-16 rounded-md border border-gray-200 bg-white">
										<img
											src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/thumbnail.png"
											alt="iphone x"
										/>
									</div>
									<div className="ml-8 flex flex-col justify-between">
										<p>Title: Lorem, ipsum.</p>
										<p>Price: $ 200</p>
									</div>
								</li>
								<li className="flex p-4  border-t-2 border-gray-200 hover:bg-gray-200">
									<div className="h-16 w-16 rounded-md border border-gray-200 bg-white">
										<img
											src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/thumbnail.png"
											alt="iphone x"
										/>
									</div>
									<div className="ml-8 flex flex-col justify-between">
										<p>Title: Lorem, ipsum.</p>
										<p>Price: $ 200</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
