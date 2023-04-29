import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStory } from '../services/storyService';
import {
	StoryWrapper,
	StoryTitle,
	StoryMeta,
	StoryMetaElement,
} from '../styles/StoryStyles';
import { mapTime } from '../mappers/mapTime';

const Story = ({ storyId }) => {
	const [story, setStory] = useState({});

	useEffect(() => {
		async function fetchStory() {
			const data = await getStory(storyId);
			if (data && data.url) {
				setStory(data);
			}
		}
		fetchStory();
	}, [storyId]);

	return story && story.url ? (
		<StoryWrapper data-testid="story">
			<StoryTitle>
				<a
					href={story.url}
					rel="noopener noreferrer"
					target="_blank"
				>
					{story.title}
				</a>
			</StoryTitle>
			<StoryMeta>
				<span data-testid="story-by">
					<StoryMetaElement color="#222">By: </StoryMetaElement>
					{story.by}
				</span>
				<span data-testid="story-time">
					<StoryMetaElement color="#222">Posted: </StoryMetaElement>
					{mapTime(story.time)}
				</span>
			</StoryMeta>
		</StoryWrapper>
	) : null;
};

Story.propTypes = {
	storyId: PropTypes.number.isRequired,
};

export default Story;