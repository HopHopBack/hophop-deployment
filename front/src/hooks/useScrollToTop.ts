'use client';
import { useEffect, useState } from 'react';

export default function useScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const scrollThreshold = 200; // Minimum scroll value at which the button becomes visible

		// Function for switching the button visibility depending on the scroll position
		const toggleVisibility = () => {
			window.scrollY > scrollThreshold
				? setIsVisible(true)
				: setIsVisible(false);
		};

		// Add a scroll event listener
		window.addEventListener('scroll', toggleVisibility);

		// Remove the event listener when unmounting a component
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	// Function for smooth scrolling up the page
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	return { isVisible, scrollToTop };
}
