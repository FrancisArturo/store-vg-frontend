import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAppSelector } from "../hooks/store";
import { useFiltersActions } from "../hooks/useFiltersActions";
import type { CategoryFound, Product } from "../types";
import { searchBrands } from "../services/searchBrands";
import { BiMinus, BiSolidSend, BiSolidXCircle } from "react-icons/bi";

interface Props {
	products: Product[];
	category?: CategoryFound;
	isLoading: boolean;
}

export const Filters: React.FC<Props> = ({ products, category, isLoading }) => {
	// const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	const filters = useAppSelector((store) => store.filters);
	const { addMinPriceFilter, addMaxPriceFilter, addBrandFilter } =
		useFiltersActions();

	const brandsFounded = searchBrands(products);

	const onSubmitFilterPrice = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addMinPriceFilter(Number(e.currentTarget.minPrice.value));
		addMaxPriceFilter(Number(e.currentTarget.maxPrice.value));
	};

	return (
		<div>
			<div>
				{/* Mobile filter dialog */}

				<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10 flex-col">
						{!isLoading && category && (
							<div className="flex">
								<h1 className="text-4xl font-bold tracking-tight text-gray-900">
									{category.title}
								</h1>
								<p className="font-medium ml-2">{category.quantity}</p>
							</div>
						)}

						<div className="flex md:gap-x-10 items-end mt-20 self-end flex-row-reverse gap-y-7 justify-between w-[100%]">
							{filters.brand && (
								<div className="text-gray-700 text-sm font-medium flex">
									<BiSolidXCircle
										className="text-xl mr-2 cursor-pointer"
										onClick={() => addBrandFilter("")}
									/>{" "}
									Brand: {filters.brand}
								</div>
							)}
							{!filters.brand && (
								<Menu
									as="div"
									className="relative inline-block text-center ml-4"
								>
									<div>
										<MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
											Brand
											<ChevronDownIcon
												aria-hidden="true"
												className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
											/>
										</MenuButton>
									</div>

									<MenuItems
										transition
										className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5"
									>
										<div className="py-1">
											{brandsFounded.map((brand) => (
												<MenuItem key={brand.title}>
													{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
													<p
														onClick={() =>
															addBrandFilter(brand.title as string)
														}
														className="cursor-pointer m-3 hover:underline text-gray-500"
													>
														{brand.title} ({brand.quantity})
													</p>
												</MenuItem>
											))}
										</div>
									</MenuItems>
								</Menu>
							)}
							<form
								className="priceRange flex items-end"
								onSubmit={(e) => onSubmitFilterPrice(e)}
							>
								<p className="mr-4 text-gray-700 text-sm font-medium">
									Price:{" "}
								</p>
								<input
									type="text"
									className="w-20 text-center bg-gray-300"
									placeholder="$ Min"
									name="minPrice"
								/>
								<BiMinus className="text-2xl" />
								<input
									type="text"
									className="w-20 text-center bg-gray-300"
									placeholder="$ Max"
									name="maxPrice"
								/>
								<button type="submit">
									<BiSolidSend className="text-2xl ml-2 cursor-pointer text-gray-500 hover:text-black duration-300" />
								</button>
							</form>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};
