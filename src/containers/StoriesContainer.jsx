import React, { useEffect, useState } from 'react';
import { fetchStoryIds } from '../services/storyService';
import { Story } from '../components/Story';

export const StoriesContainer = () => {
	const [storyIds, setStoryIds] = useState([]);
	const [count, setCount] = useState(0);

	useEffect(() => {
		fetchStoryIds().then((data) => setStoryIds(data));
	}, []);

	return (
		<>
			<h1>Hacker News Stories</h1>
			<hr />
			{storyIds.slice(0, count).map((storyId) => (
				<Story
					key={storyId}
					storyId={storyId}
				/>
			))}
			<button onClick={() => setCount(count + 1)}>Load More</button>
		</>
	);
};
