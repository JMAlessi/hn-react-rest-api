import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { App } from '../App';
import { STORY_INCREMENT } from '../constants';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { storyService } from '../services/storyService';

jest.mock('../hooks/useInfiniteScroll', () => ({
	useInfiniteScroll: jest.fn(),
}));

jest.mock('../services/storyService');

describe('App', () => {
	let storyServiceMock;

	beforeEach(() => {
		jest.resetAllMocks();
		cleanup();

		storyServiceMock = {
			getTopStories: jest.fn(),
		};

		storyService.mockImplementation(() => storyServiceMock);
	});

	it('renders the application', async () => {
		useInfiniteScroll.mockImplementation(() => ({
			count: STORY_INCREMENT,
		}));

		const singularStory = {
			title: 'Tarnished: Google Responds',
			url: 'https://something.com/hackernewstut',
			author: 'Karl Hadwen',
			num_comments: 266,
			points: 57,
			objectID: 1,
		};

		const storyIds = [1];

		storyServiceMock.getTopStories.mockImplementation(() =>
			Promise.resolve(storyIds)
		);
		const fetchStoryPromise = Promise.resolve({
			...singularStory,
		});

		jest.spyOn(global, 'fetch').mockImplementation((url) => {
			if (url.includes('1.json')) {
				return fetchStoryPromise;
			}
		});

		const { getByText, queryByTestId } = render(<App />);
		expect(getByText('Top Stories')).toBeTruthy();
		expect(getByText('Tarnished: Google Responds')).toBeTruthy();
		expect(queryByTestId('story-by').textContent).toEqual('By: Karl Hadwen');
	});

	it('does not render stories when there are no story ids', async () => {
		useInfiniteScroll.mockImplementation(() => ({
			count: STORY_INCREMENT,
		}));
		storyServiceMock.getTopStories.mockImplementation(() =>
			Promise.resolve([])
		);
		const { queryByText } = render(<App />);
		expect(queryByText('Tarnished: Google Responds')).toBeFalsy();
	});
});
