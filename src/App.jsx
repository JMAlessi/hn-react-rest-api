import React, { useState, useEffect } from 'react';
import StoryService from './services/StoryService';
import StoryList from './components/StoryList';

const storyService = new StoryService();

const App = () => {
	const [stories, setStories] = useState([]);

	useEffect(() => {
		const fetchStories = async () => {
			try {
				const data = await storyService.getTopStories();
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

export default App;
