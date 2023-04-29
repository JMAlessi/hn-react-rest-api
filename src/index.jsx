import React from 'react';
import { createRoot } from 'react-dom';
import { StoryService } from './services/storyService';
import { App } from './App';

const storyService = new StoryService();

createRoot(document.getElementById('root')).render(
	<App storyService={storyService} />
);
