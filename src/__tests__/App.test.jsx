import React from 'react';
import { render, screen } from '@testing-library/react';
import StoryService from './StoryService';

// Mock the fetchStory function
jest.mock('./StoryService', () => ({
	fetchStory: jest.fn().mockResolvedValue({
		title: 'Test Story',
		url: 'https://example.com',
		by: 'John Doe',
		time: 1623456789,
	}),
}));

describe('StoryService', () => {
	it('should render the story when data is available', async () => {
		const storyId = 1;

		render(<StoryService storyId={storyId} />);

		// Wait for the data to be fetched and rendered
		const storyTitle = await screen.findByText('Test Story');
		const storyBy = screen.getByText('By: John Doe');
		const storyTime = screen.getByText('Posted: 1 hour ago');

		// Verify that the story elements are rendered
		expect(storyTitle).toBeInTheDocument();
		expect(storyBy).toBeInTheDocument();
		expect(storyTime).toBeInTheDocument();
	});

	it('should not render anything when story data is not available', async () => {
		const storyId = 2;

		render(<StoryService storyId={storyId} />);

		// Wait for the data to be fetched
		await screen.findByTestId('story');

		// Verify that no story elements are rendered
		expect(screen.queryByTestId('story')).toBeNull();
	});
});
