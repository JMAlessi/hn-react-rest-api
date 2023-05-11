import React from 'react';
import { render, screen } from '@testing-library/react';
import Story from './Story';

// Mock the StoryService module
jest.mock('../services/StoryService', () => ({
	fetchStory: jest.fn().mockResolvedValue({
		title: 'Test Story',
		url: 'https://example.com',
		by: 'John Doe',
		time: 1623456789,
	}),
}));

// Mock the mapTime module
jest.mock('../mappers/mapTime', () => ({
	mapTime: jest.fn().mockReturnValue('1 hour ago'),
}));

describe('Story', () => {
	it('should render the story when data is available', async () => {
		render(<Story storyId={1} />);
		// Wait for the story data to be fetched and rendered
		await screen.findByTestId('story');
		// Verify that the story title is rendered
		expect(screen.getByText('Test Story')).toBeInTheDocument();
		// Verify that the story author is rendered
		expect(screen.getByText('By: John Doe')).toBeInTheDocument();
		// Verify that the story time is rendered
		expect(screen.getByText('Posted: 1 hour ago')).toBeInTheDocument();
	});

	it('should not render anything when story data is not available', async () => {
		// Mock the fetchStory function to return empty data
		jest.spyOn(window, 'fetchStory').mockResolvedValue({});
		render(<Story storyId={1} />);
		// Wait for the story data to be fetched and checked
		await screen.findByTestId('story');
		// Verify that no story elements are rendered
		expect(screen.queryByTestId('story')).not.toBeInTheDocument();
	});
});
