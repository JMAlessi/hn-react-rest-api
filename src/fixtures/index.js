export const singularStory = {
	by: 'John Doe', // Author of the story.
	id: 1, // ID of the story.
	time: 1677209950, // Unix timestamp of when the story was published.
	title: 'Hello World!', // Title of the story.
	url: 'https://something.com/', // URL of the story.
};

export const storyIds = [1]; // An array containing the ID(s) of the available stories.

export const emptySingularStory = {
	by: '', // Empty string as no author is available.
	id: null, // Null value as no ID is available.
	time: null, // Null value as no timestamp is available.
	title: '', // Empty string as no title is available.
	url: '', // Empty string as no URL is available.
};
