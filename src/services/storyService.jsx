import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { mapTime } from '../mappers/mapTime';

export async function fetchStory(storyId) {
	const response = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
	);
	const data = await response.json();
	return data;
}

export default function StoryService({ storyId }) {
	const [story, setStory] = useState(null);

	useEffect(() => {
		async function fetchStoryData() {
			const data = await fetchStory(storyId);
			setStory(data);
		}

		fetchStoryData();
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
					<div
						className="story-meta-element"
						style={{ color: '#222' }}
					>
						By:{' '}
					</div>
					{story.by}
				</span>
				<span data-testid="story-time">
					<div
						className="story-meta-element"
						style={{ color: '#222' }}
					>
						Posted:{' '}
					</div>
					{mapTime(story.time)}
				</span>
			</div>
		</div>
	) : null;
}

StoryService.propTypes = {
	storyId: PropTypes.number.isRequired,
};
