import { useCartActions } from "../hooks/useCartActions";
import type { Product } from "../types";
import { useCheckCartProduct } from "../hooks/useCheckCartProduct";
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { useAppSelector } from "../hooks/store";

interface Props {
	product: Product;
}

export const ProductItem: React.FC<Props> = ({ product }) => {
	const { currency } = useAppSelector((state) => state.filters);

	const { addProductToCart } = useCartActions();
	const { isProductInCart } = useCheckCartProduct();

	return (
		<div>
			<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
				<a href={`/product/${product.sku}`} className="group">
					<img
						alt={product.title}
						src={product.thumbnail}
						className="h-full w-full object-cover object-center group-hover:opacity-75"
					/>
				</a>
			</div>
			<div className="flex justify-between">
				<div>
					<h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
					{currency === "usd" && (
						<p className="mt-1 text-lg font-medium text-gray-900">
							$ {product.price.usd}
						</p>
					)}
					{currency === "eur" && (
						<p className="mt-1 text-lg font-medium text-gray-900">
							€ {product.price.eur}
						</p>
					)}
				</div>
				{isProductInCart(product) ? (
					<div className="self-center text-3xl mr-2 text-gray-300 box">
						<BsCartCheckFill />
					</div>
				) : (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						className="self-center text-3xl mr-2 cursor-pointer box"
						onClick={() => addProductToCart(product)}
					>
						<BsCartPlusFill />
					</div>
				)}
			</div>
		</div>
	);
};
