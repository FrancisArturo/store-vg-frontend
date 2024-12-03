import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAppSelector } from "../hooks/store";
import { useFiltersActions } from "../hooks/useFiltersActions";
import type { Product } from "../types";
import { searchBrands } from "../services/searchBrands";
import {
	BiMinus,
	BiSolidSend,
	BiSolidTrash,
	BiSolidXCircle,
} from "react-icons/bi";

interface Props {
	totalProducts: Product[];
	isLoading: boolean;
}

export const Filters: React.FC<Props> = ({ totalProducts, isLoading }) => {
	// const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	const { brand, minPrice, maxPrice } = useAppSelector(
		(store) => store.filters,
	);
	const { addMinPriceFilter, addMaxPriceFilter, addBrandFilter } =
		useFiltersActions();

	const brandsFounded = searchBrands(totalProducts);

	const onSubmitFilterPrice = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addMinPriceFilter(Number(e.currentTarget.minPrice.value));
		addMaxPriceFilter(Number(e.currentTarget.maxPrice.value));
	};

	const onClearFilterPrice = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		addMinPriceFilter(0);
		addMaxPriceFilter(0);
		if (e.currentTarget.form) e.currentTarget.form.reset();
	};

	return (
		<div>
			<div>
				{/* Mobile filter dialog */}

				<main className="mx-auto lg:max-w-7xl px-4 sm:px-6 lg:px-8 max-w-2xl">
					<div className="flex items-baseline justify-between border-b border-gray-200 pb-6 flex-col">
						<div className="flex md:gap-x-10 items-end mt-20 self-end flex-row-reverse gap-y-7 justify-between w-[100%]">
							{brand && (
								<div className="text-gray-700 text-sm font-medium flex">
									<BiSolidXCircle
										className="text-xl mr-2 cursor-pointer"
										onClick={() => addBrandFilter("")}
									/>{" "}
									Brand: {brand}
								</div>
							)}
							{!brand && (
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
								{isLoading ? (
									<>
										<svg
											aria-hidden="true"
											className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300 ml-3"
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
									</>
								) : (
									<button type="submit">
										<BiSolidSend className="text-2xl ml-2 cursor-pointer text-gray-500 hover:text-black duration-300" />
									</button>
								)}
								{(minPrice || maxPrice) && !isLoading ? (
									<button type="button" onClick={(e) => onClearFilterPrice(e)}>
										<BiSolidTrash className="text-2xl ml-2 cursor-pointer text-gray-500 hover:text-black duration-300" />
									</button>
								) : (
									""
								)}
							</form>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};
