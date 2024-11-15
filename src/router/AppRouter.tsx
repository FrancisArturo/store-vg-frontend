import { createBrowserRouter } from "react-router-dom";
import { ProductPage } from "../pages/ProductPage";
import { StoreLayout } from "../layout/StoreLayout";
import { ProductsList } from "../components/ProductsList";
import "../App.css";
import { Categories } from "../components/Categories";
import { Checkout } from "../pages/Checkout";
import { HomePage } from "../pages/HomePage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <StoreLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/products",
				element: <ProductsList />,
			},
			{
				path: "/categories",
				element: <Categories />,
			},
			{
				path: "/products/:cat",
				element: <ProductsList />,
			},
			{
				path: "/product/:pid",
				element: <ProductPage />,
			},
			{
				path: "/checkout",
				element: <Checkout />,
			},
		],
	},
]);
