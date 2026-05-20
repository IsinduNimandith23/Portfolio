import { useEffect, useRef, useState } from "react";

export const useScrollReveal = (options = {}) => {
	const {
		threshold = 0.12,
		rootMargin = "0px 0px -15% 0px",
		once = true,
	} = options;

	const ref = useRef(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return undefined;

		if (typeof IntersectionObserver === "undefined") {
			setInView(true);
			return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					if (once) observer.unobserve(node);
				} else if (!once) {
					setInView(false);
				}
			},
			{ threshold, rootMargin }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [threshold, rootMargin, once]);

	return [ref, inView];
};
