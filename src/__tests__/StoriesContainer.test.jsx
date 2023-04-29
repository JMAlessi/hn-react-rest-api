import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { storyIds, singularStory } from '../fixtures';
import { fetchStory, fetchStoryIds } from '../services/StoryService';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { STORY_INCREMENT } from '../constants';
import { StoriesContainer } from '../services/storiesContainer';

beforeEach(cleanup);

jest.mock('../hooks/useInfiniteScroll');

jest.mock('../services/StoryService', () => ({
	fetchStory: jest.fn(),
	fetchStoryIds: jest.fn(),
}));

test('renders the story container with a story', async () => {
	useInfiniteScroll.mockImplementation(() => ({
		count: STORY_INCREMENT,
	}));
	fetchStory.mockImplementation(() => Promise.resolve(singularStory));
	fetchStoryIds.mockImplementation(() => Promise.resolve(storyIds));

	const { getByText, queryByTestId } = render(<StoriesContainer />);
	await waitFor(() => [
		expect(getByText('Hacker News Stories')).toBeTruthy(),
		expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
		expect(queryByTestId('story-by').textContent).toEqual('By: Karl Hadwen'),
	]);
});
