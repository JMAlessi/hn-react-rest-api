import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Story from './Story';
import { fetchStoryIds } from '../services/storyService';

function StoryList({ storiesPerPage }) {
	const [storyIds, setStoryIds] = useState([]);

	useEffect(() => {
		async function fetchStoryIds() {
			const ids = await fetchStoryIds();
			setStoryIds(ids);
		}
		fetchStoryIds();
	}, []);

	return (
		<>
			{storyIds.slice(0, storiesPerPage).map((storyId) => (
				<Story
					key={storyId}
					storyId={storyId}
				/>
			))}
		</>
	);
}

StoryList.propTypes = {
	storiesPerPage: PropTypes.number,
};

StoryList.defaultProps = {
	storiesPerPage: 30,
};

export default StoryList;
