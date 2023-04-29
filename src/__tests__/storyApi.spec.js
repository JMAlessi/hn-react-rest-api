const axios = require('axios');
const supertest = require('supertest');
const app = require('../services/storyService');

jest.mock('axios');

const mockedData = {
	title: 'Test Story',
	by: 'Test Author',
	url: 'https://teststory.com',
};

const mockedStoryIds = [1, 2, 3];

const mockedGetStory = async (storyId) => {
	const data = {
		...mockedData,
		id: storyId,
	};
	return data;
};

const mockedGetStoryIds = async () => {
	return mockedStoryIds;
};

describe('API endpoints', () => {
	let request;
	beforeAll(() => {
		request = supertest(app);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('GET /story/:id returns the correct story', async () => {
		axios.get.mockImplementation((url) => {
			if (url.includes('item')) {
				const storyId = url.split('/').pop().split('.json')[0];
				return Promise.resolve({
					data: {
						...mockedData,
						id: storyId,
					},
				});
			}
			return Promise.reject(new Error('Invalid URL'));
		});

		const res = await request.get('/story/1');

		expect(res.status).toEqual(200);
		expect(res.body).toEqual(mockedData);
	});

	it('GET /stories returns the correct story ids', async () => {
		axios.get.mockImplementation((url) => {
			if (url.includes('topstories')) {
				return Promise.resolve({
					data: mockedStoryIds,
				});
			}
			return Promise.reject(new Error('Invalid URL'));
		});

		const res = await request.get('/stories');

		expect(res.status).toEqual(200);
		expect(res.body).toEqual(mockedStoryIds);
	});
});
