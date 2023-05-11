import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { fetchStory } from '../../services/StoryService';
import { Story } from '../../components/Story';
import StoriesContainer from '../StoriesContainer';

jest.mock('../../services/StoryService', () => ({
	fetchStory: jest.fn(),
}));

jest.mock('../../components/Story', () => ({
	Story: jest.fn(() => <div>Mocked Story Component</div>),
}));

describe('StoriesContainer', () => {
	beforeEach(() => {
		fetchStory.mockClear();
		Story.mockClear();
	});

	it('should fetch story IDs and render the component', async () => {
		const mockStoryIds = [1, 2, 3];
		fetchStory.mockResolvedValueOnce(mockStoryIds);

		render(<StoriesContainer />);

		// Verify that the loading state is rendered initially
		expect(screen.getByText('HN Stories')).toBeInTheDocument();
		expect(screen.getByText('Loading...')).toBeInTheDocument();

		// Wait for the fetchStory promise to resolve
		await waitFor(() => {
			// Verify that the Story component is rendered with the fetched story IDs
			expect(Story).toHaveBeenCalledTimes(3);
			expect(Story).toHaveBeenCalledWith({ key: 1, storyId: 1 }, {});
			expect(Story).toHaveBeenCalledWith({ key: 2, storyId: 2 }, {});
			expect(Story).toHaveBeenCalledWith({ key: 3, storyId: 3 }, {});
		});
	});

	it('should render the "Load More" button', () => {
		fetchStory.mockResolvedValueOnce([1, 2, 3]);

		render(<StoriesContainer />);

		// Verify that the "Load More" button is rendered
		expect(screen.getByText('Load More')).toBeInTheDocument();
	});

	it('should increment the count when "Load More" button is clicked', () => {
		fetchStory.mockResolvedValueOnce([1, 2, 3]);

		render(<StoriesContainer />);

		// Verify the initial count value
		expect(screen.getByText('Count: 0')).toBeInTheDocument();

		// Click the "Load More" button
		const loadMoreButton = screen.getByText('Load More');
		loadMoreButton.click();

		// Verify that the count is incremented
		expect(screen.getByText('Count: 1')).toBeInTheDocument();
	});
});
