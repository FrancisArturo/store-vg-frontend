import { type RefObject, useEffect } from "react";

export const useClickOutside = (
	barRef: RefObject<HTMLElement | undefined>,
	iconRef: RefObject<HTMLElement | undefined>,
	callback: () => void,
) => {
	console.log("llamada useClickOutside");
	useEffect(() => {
		const handleClick = (event: MouseEvent): void => {
			if (
				barRef.current &&
				iconRef.current &&
				!barRef.current.contains(event.target as Node) &&
				!iconRef.current.contains(event.target as Node)
			) {
				console.log("callback call");
				callback();
			}
		};

		document.addEventListener("mousedown", handleClick);

		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, [barRef, iconRef, callback]);
};
