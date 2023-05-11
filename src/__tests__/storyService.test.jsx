import React from 'react';
import { render, screen } from '@testing-library/react';
import StoryService from './StoryService';

jest.mock('../mappers/mapTime', () => ({
	mapTime: jest.fn().mockReturnValue('1 hour ago'),
}));

describe('StoryService', () => {
	it('should render the story when data is available', () => {
		const story = {
			title: 'Test Story',
			url: 'https://example.com',
			by: 'John Doe',
			time: 1623456789,
		};

		render(<StoryService storyId={1} />);

		// Verify that the story title is rendered
		expect(screen.getByText('Test Story')).toBeInTheDocument();
		// Verify that the story author is rendered
		expect(screen.getByText('By: John Doe')).toBeInTheDocument();
		// Verify that the story time is rendered
		expect(screen.getByText('Posted: 1 hour ago')).toBeInTheDocument();
	});

	it('should not render anything when story data is not available', () => {
		render(<StoryService storyId={1} />);

		// Verify that no story elements are rendered
		expect(screen.queryByTestId('story')).not.toBeInTheDocument();
	});
});
