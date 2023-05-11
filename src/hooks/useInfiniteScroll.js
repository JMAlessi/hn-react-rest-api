import { useState, useEffect, useCallback } from 'react';
import { STORY_INCREMENT, MAX_STORIES } from '../constants';
import { debounce } from '../utils/debounce';

/**
 * Custom hook for implementing infinite scrolling behavior.
 * @returns {Object} An object containing the current count state.
 */
export const useInfiniteScroll = () => {
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(STORY_INCREMENT);

	/**
	 * Event handler for scroll events.
	 * Uses debounce to throttle the function execution.
	 */
	const handleScroll = useCallback(
		debounce(() => {
			// Check if the user has scrolled to the bottom of the page and not currently loading.
			if (
				window.innerHeight + document.documentElement.scrollTop !==
					document.documentElement.offsetHeight ||
				loading
			) {
				return false;
			}
			setLoading(true);
		}, 500),
		[loading]
	);

	// Update count and loading state when the loading state changes.
	useEffect(() => {
		if (!loading) return;

		if (count + STORY_INCREMENT >= MAX_STORIES) {
			// If the next count exceeds the maximum number of stories, set count to the maximum.
			setCount(MAX_STORIES);
		} else {
			// Increment count by STORY_INCREMENT.
			setCount((prevCount) => prevCount + STORY_INCREMENT);
		}
		setLoading(false);
	}, [count, loading]);

	// Attach scroll event listener when the component mounts.
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		// Clean up by removing the scroll event listener when the component unmounts.
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	// Return the current count state.
	return { count };
};
