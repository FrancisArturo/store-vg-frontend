import { useAppSelector } from "../hooks/store";
import { sendCheckoutData } from "../services/sendCheckoutData";

export const Checkout: React.FC = () => {
	const { amount, cartProducts } = useAppSelector((state) => state.cart);

	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newOrderData = {
			firstName: e.currentTarget.firstName.value,
			lastName: e.currentTarget.lastName.value,
			email: e.currentTarget.email.value,
			address: e.currentTarget.address.value,
			date: new Date().toLocaleDateString(),
			products: [...cartProducts],
			total: amount,
		};

		const res = await sendCheckoutData(newOrderData);
		console.log(res);
	};

	return (
		<>
			<ul>
				{cartProducts.map((product) => (
					<li key={product.id}>
						<img src={product.thumbnail} alt={product.title} />
						<p>{product.title} </p>
						<p>${product.price} </p>
						<p>Quantity: {product.quantity}</p>
					</li>
				))}
				<p>Total: ${amount}</p>
			</ul>
			<form onSubmit={onSubmitForm}>
				<input type="text" placeholder="First Name" name="firstName" required />
				<input type="text" placeholder="Last Name" name="lastName" required />
				<input type="email" placeholder="Email" name="email" required />
				<input type="text" placeholder="Address" name="address" required />
				<button type="submit">Confirm</button>
			</form>
		</>
	);
};
