import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import StoryList from '../components/StoryList';
import { singularStory } from '../fixtures/index';
import { getStoryIds, getStory } from '../services/storyService';

beforeEach(() => {
	cleanup();
	jest.resetAllMocks();
});

jest.mock('../services/storyService', () => ({
	getStoryIds: jest.fn(),
	getStory: jest.fn(),
}));

test('renders the StoryList component', async () => {
	getStoryIds.mockImplementation(() => Promise.resolve([1, 2, 3, 4, 5]));
	getStory.mockImplementation(() => Promise.resolve(singularStory));

	const { getByTestId, queryAllByTestId } = render(
		<StoryList storiesPerPage={5} />
	);

	await waitForElement(() => [
		expect(getByTestId('story-list')).toBeTruthy(),
		expect(queryAllByTestId('story')).toBeTruthy(),
	]);
});
