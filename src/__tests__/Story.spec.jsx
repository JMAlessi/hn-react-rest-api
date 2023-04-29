import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { Story } from '../components/Story';
import { singularStory } from '../fixtures/index';
import { getStory } from '../services/storyService';

beforeEach(() => {
	cleanup();
	jest.resetAllMocks();
});

jest.mock('../services/storyService', () => ({
	getStory: jest.fn(),
}));

test('renders the story component with content', async () => {
	getStory.mockImplementation(() => Promise.resolve(singularStory));

	const { getByText, getByTestId } = render(<Story storyId="1" />);

	await waitForElement(() => [
		expect(getByTestId('Story')).toBeTruthy(),
		expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
		expect(getByTestId('story-by').textContent).toEqual('By: Karl Hadwen'),
	]);
});
