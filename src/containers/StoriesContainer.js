import React, { useEffect, useState } from "react";
import { getStoryIds, getStory } from "../services/hnApi.js";
import { Story } from "../components/Story.js";
import {
  GlobalStyle,
  StoriesContainerWrapper
} from "../styles/StoryContainerStyles.js";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.js";

export const StoriesContainer = () => {
  const { count } = useInfiniteScroll();
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    getStoryIds().then(data => setStoryIds(data));
    console.log("count", count);
  }, [count]);

  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>Hacker News Stories:</h1>
        {storyIds.slice(0, count).map(storyId => (
          <Story key={storyId} storyId={storyId} />
        ))}
      </StoriesContainerWrapper>
    </>
  );
};
