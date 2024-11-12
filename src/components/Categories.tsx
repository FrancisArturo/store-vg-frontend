import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/store";

export const Categories: React.FC = () => {
	const { categories } = useAppSelector((state) => state.products);

	return (
		<>
			{categories.length === 0 && <p>Categories not found</p>}
			{categories.length > 0 && (
				<div>
					{categories.map((category, index) => (
						<Link to={`/products/${category.title}`} key={category.title}>
							{/* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
							<h3 key={index}>
								{category.title} ({category.quantity})
							</h3>
						</Link>
					))}
				</div>
			)}
		</>
	);
};
