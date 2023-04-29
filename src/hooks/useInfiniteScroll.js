import { useState, useEffect, useCallback } from 'react';
import { STORY_INCREMENT, MAX_STORIES } from '../constants';
import { debounce } from '../utils/debounce';

export const useInfiniteScroll = () => {
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(STORY_INCREMENT);

	const handleScroll = useCallback(
		debounce(() => {
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

	useEffect(() => {
		if (!loading) return;

		if (count + STORY_INCREMENT >= MAX_STORIES) {
			setCount(MAX_STORIES);
		} else {
			setCount((prevCount) => prevCount + STORY_INCREMENT);
		}

		setLoading(false);
	}, [count, loading]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return { count };
};
