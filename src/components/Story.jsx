import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/StoryStyles.scss';
import { mapTime } from '../mappers/mapTime';

const Story = ({ storyId }) => {
	const [story, setStory] = useState({});

	useEffect(() => {
		async function fetchStory() {
			const data = await fetchStory(storyId);
			if (data && data.url) {
				setStory(data);
			}
		}
		fetchStory();
	}, [storyId]);

	return story && story.url ? (
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
					{story.title}
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
					{story.by}
				</span>
				<span data-testid="story-time">
					<span
						className="story-meta-element"
						style={{ color: '#222' }}
					>
						Posted:
					</span>
					{mapTime(story.time)}
				</span>
			</div>
		</div>
	) : null;
};

Story.propTypes = {
	storyId: PropTypes.number.isRequired,
};

export default Story;
