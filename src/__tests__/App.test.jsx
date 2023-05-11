import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../services/StoryService', () => ({
	getTopStories: jest.fn().mockResolvedValue([
		{ id: 1, title: 'Story 1' },
		{ id: 2, title: 'Story 2' },
	]),
}));

describe('App', () => {
	beforeEach(() => {
		render(<App />);
	});

	it('should render the heading', () => {
		expect(screen.getByText('Top Stories')).toBeInTheDocument();
	});

	it('should render the list of stories', async () => {
		// Wait for stories to be fetched and rendered
		await screen.findAllByTestId('story');

		expect(screen.getByText('Story 1')).toBeInTheDocument();
		expect(screen.getByText('Story 2')).toBeInTheDocument();
	});
});
