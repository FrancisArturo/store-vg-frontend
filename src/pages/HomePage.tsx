import { useEffect } from "react";
import { useProductsActions } from "../hooks/useProductsActions";
import { useAppSelector } from "../hooks/store";
import { saveCurrencyLocalStorage } from "../services/filtersLocalStorage";

export const HomePage = () => {
	const { getAllProducts } = useProductsActions();
	const { currency } = useAppSelector((state) => state.filters);

	useEffect(() => {
		getAllProducts(1, currency, "undefined", "", 0, 0);
		saveCurrencyLocalStorage(currency);
	}, [getAllProducts, currency]);

	return (
		<div className="flex h-[calc(100vh-105px)] justify-center items-center">
			<div
				className="z-10 absolute
            "
			>
				<div className="text-white text-7xl max-w-[10rem] font-semibold">
					<h1>VG Store - Tech Products Store</h1>
				</div>
				<a
					href="/products"
					className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-black -focus:ring-offset-2 focus:bg-slate-300 hover:bg-black hover:text-white duration-500"
				>
					Explore our products
				</a>
			</div>

			<div
				style={{
					backgroundImage: "url(https://i.imgur.com/XpSdi50.png)",
				}}
				className=" bg-cover bg-center bg-black 
                opacity-90 w-full h-full brightness-50"
			/>
		</div>
	);
};
