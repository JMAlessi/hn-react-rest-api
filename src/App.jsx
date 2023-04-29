import React, { useState, useEffect } from 'react';
import storyService from './services/storyService';
import StoryList from './components/StoryList';

const StoryService = new storyService();

export const App = () => {
	const [stories, setStories] = useState([]);

	useEffect(() => {
		const fetchStories = async () => {
			try {
				const data = await StoryService.getTopStories();
				setStories(data);
			} catch (error) {
				// handle error
			}
		};
		fetchStories();
	}, []);

	return (
		<div>
			<h1>Top Stories</h1>
			<StoryList stories={stories} />
		</div>
	);
};
