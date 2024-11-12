import { useId } from "react";
import { useAppSelector } from "../hooks/store";
import { useFiltersActions } from "../hooks/useFiltersActions";
import type { Product } from "../types";
import { searchBrands } from "../services/searchBrands";

interface Props {
	products: Product[];
}

export const Filters: React.FC<Props> = ({ products }) => {
	const filters = useAppSelector((store) => store.filters);
	const { addMinPriceFilter, addBrandFilter } = useFiltersActions();
	const minPriceFilterId = useId();

	const brandsFounded = searchBrands(products);

	// const filterObjectToArray = filters

	const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		addMinPriceFilter(value);
	};

	const handleChangeBrandFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		addBrandFilter(value);
	};

	return (
		<>
			{filters.brand && (
				<div onClick={() => addBrandFilter("")}>{filters.brand} x</div>
			)}
			<div className="priceRange">
				<label htmlFor={minPriceFilterId}>Min Price</label>
				<input
					type="range"
					id={minPriceFilterId}
					min="0"
					max="700"
					onChange={handleChangeMinPrice}
				/>
				<span>{filters.minPrice}</span>
			</div>
			{!filters.brand && (
				<div onChange={handleChangeBrandFilter}>
					{brandsFounded.map((brand) => (
						<div key={brand.title}>
							<input
								type="radio"
								id={brand.title}
								name="brand"
								value={brand.title}
							/>
							<label htmlFor={brand.title}>
								{brand.title} ({brand.quantity})
							</label>
						</div>
					))}
				</div>
			)}
		</>
	);
};
