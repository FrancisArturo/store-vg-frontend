import { type RefObject, useEffect } from "react";

export const useClickOutside = (
	ref: RefObject<HTMLElement | undefined>,
	callback: () => void,
) => {
	console.log("llamada");

	useEffect(() => {
		const handleClick = (event: MouseEvent): void => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener("mousedown", handleClick);

		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, [ref, callback]);
};
