// import { useEffect } from "react";
// import { useProductsActions } from "../hooks/useProductsActions";
// import { Cart } from "../components/Cart";
import { Outlet } from "react-router-dom";
import { useProductsActions } from "../hooks/useProductsActions";
import { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { Cart } from "../components/Cart";

export const StoreLayout = () => {
	const { getAllProducts, getAllCategories } = useProductsActions();

	useEffect(() => {
		getAllProducts();
		getAllCategories();
	}, [getAllProducts, getAllCategories]);

	return (
		<>
			<header>
				<NavBar />
				<Cart />
			</header>
			<main className="bg-[#f3f4f6] pt-6">
				<Outlet />
			</main>
		</>
	);
};
