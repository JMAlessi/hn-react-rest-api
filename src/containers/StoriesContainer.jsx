import React, { useEffect, useState } from 'react';
import { fetchStory } from '../services/StoryService';
import { Story } from '../components/Story';

const StoriesContainer = () => {
	// State for storing the fetched story IDs and the count of displayed stories.
	const [storyIds, setStoryIds] = useState([]);
	const [count, setCount] = useState(0);

	useEffect(() => {
		// Fetch story IDs and update the state when the component mounts.
		useEffect(() => {
			fetchStory().then(setStoryIds);
		}, []);

		return () => {
			// Cleanup function to cancel any pending fetch request.
			// when the component is unmounted.
		};
	}, []); // Empty dependency array to run the effect only once.

	return (
		<>
			{/* Header */}
			<h1>HN Stories</h1>
			<hr />

			{/* Render the list of stories. */}
			{storyIds.slice(0, count).map((storyId) => (
				<Story
					key={storyId}
					storyId={storyId}
				/>
			))}

			{/* Load more button. */}
			<button onClick={() => setCount(count + 1)}>Load More</button>
		</>
	);
};

export default StoriesContainer;
