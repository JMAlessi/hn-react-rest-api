import React from 'react';
import { StoryService } from './services/StoryService.js';
import { StoryList } from './components/StoryList.js';

const storyService = new StoryService();

export const App = () => {
	const [stories, setStories] = React.useState([]);

	React.useEffect(() => {
		storyService.getTopStories().then((data) => {
			setStories(data);
		});
	}, []);

	return (
		<div>
			<h1>Top Stories</h1>
			<StoryList stories={stories} />
		</div>
	);
};
