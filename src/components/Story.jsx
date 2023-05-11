import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchStory } from '../services/StoryService'; // Import the fetchStory function
import { mapTime } from '../mappers/mapTime';

const Story = ({ storyId }) => {
	const [story, setStory] = useState({});

	useEffect(() => {
		async function fetchStoryData() {
			const data = await fetchStory(storyId); // Call fetchStory function with storyId
			if (data && data.url) {
				setStory(data); // Set the fetched story data to the state
			}
		}
		fetchStoryData(); // Call the fetchStoryData function when storyId changes
	}, [storyId]);

	return story && story.url ? ( // Render the story if it has a URL
		<div
			className="story-wrapper"
			data-testid="story"
		>
			<div className="story-title">
				<a
					href={story.url}
					rel="noopener noreferrer"
					target="_blank"
				>
					{story.title} {/* Display the story title */}
				</a>
			</div>
			<div className="story-meta">
				<span data-testid="story-by">
					<span
						className="story-meta-element"
						style={{ color: '#222' }}
					>
						By:
					</span>
					{story.by} {/* Display the story author */}
				</span>
				<span data-testid="story-time">
					<span
						className="story-meta-element"
						style={{ color: '#222' }}
					>
						Posted:
					</span>
					{mapTime(story.time)} {/* Display the formatted story time */}
				</span>
			</div>
		</div>
	) : null; // If story or story URL is not available, render nothing
};

Story.propTypes = {
	storyId: PropTypes.number.isRequired, // Ensure storyId prop is provided and is a number
};

export default Story;
