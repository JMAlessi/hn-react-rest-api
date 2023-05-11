import React from 'react';
import { render, screen } from '@testing-library/react';
import StoryList from '../StoryList';

jest.mock('../../services/StoryService', () => ({
	fetchStory: jest.fn().mockResolvedValue([1, 2, 3]), // Mocking fetchStory to return an array of story ids
}));

jest.mock('../Story', () => ({
	__esModule: true,
	default: jest.fn().mockReturnValue(<div data-testid="mock-story" />), // Mocking the Story component to return a div with a test id
}));

describe('StoryList', () => {
	it('should render the correct number of stories', async () => {
		render(<StoryList storiesPerPage={2} />);
		// Wait for the story ids to be fetched and rendered
		await screen.findByTestId('mock-story');
		// Verify that the correct number of stories are rendered
		expect(screen.getAllByTestId('mock-story')).toHaveLength(2);
	});

	it('should render the default number of stories if storiesPerPage prop is not provided', async () => {
		render(<StoryList />);
		// Wait for the story ids to be fetched and rendered
		await screen.findByTestId('mock-story');
		// Verify that the default number of stories (30) are rendered
		expect(screen.getAllByTestId('mock-story')).toHaveLength(30);
	});
});
