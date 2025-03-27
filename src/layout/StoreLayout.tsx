import { Outlet } from "react-router-dom";
import { useProductsActions } from "../hooks/useProductsActions";
import { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { Cart } from "../components/Cart";
import { Footer } from "../components/Footer";

export const StoreLayout = () => {
	const { getAllCategories } = useProductsActions();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getAllCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<header>
				<NavBar />
				<Cart />
			</header>
			<main>
				<Outlet />
			</main>
			<footer>
				<Footer />
			</footer>
		</>
	);
};
