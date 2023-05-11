import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Story from './Story';
import { fetchStoryIds } from '../services/StoryService';

function StoryList({ storiesPerPage }) {
	const [storyIds, setStoryIds] = useState([]);

	useEffect(() => {
		async function fetchIds() {
			const ids = await fetchStoryIds(); // Fetches story IDs using the fetchStoryIds function
			setStoryIds(ids); // Sets the fetched story IDs to the state
		}
		fetchIds(); // Calls the fetchIds function when the component mounts
	}, []);

	return (
		<>
			{storyIds.slice(0, storiesPerPage).map((storyId) => (
				<Story
					key={storyId}
					storyId={storyId} // Passes the story ID as a prop to the Story component
				/>
			))}
		</>
	);
}

StoryList.propTypes = {
	storiesPerPage: PropTypes.number, // Specifies that the storiesPerPage prop should be a number
};

StoryList.defaultProps = {
	storiesPerPage: 30, // Sets a default value of 30 for the storiesPerPage prop
};

export default StoryList;
