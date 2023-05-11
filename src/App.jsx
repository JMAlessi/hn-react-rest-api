import React, { useState, useEffect } from 'react';
import StoryService from './services/StoryService';
import StoryList from './components/StoryList';
import './styles/default.scss';

const storyService = new StoryService();

const App = () => {
	// State for storing the list of stories
	const [stories, setStories] = useState([]);

	useEffect(() => {
		/**
		 * Fetches the top stories from the story service and updates the state.
		 */
		const fetchStories = async () => {
			try {
				const data = await storyService.getTopStories();
				setStories(data);
			} catch (error) {
				// Handle error
			}
		};

		// Fetch stories when the component mounts
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
