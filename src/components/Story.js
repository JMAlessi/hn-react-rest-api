import React, { useState, useEffect, memo } from "react";
import { getStory } from "../services/hnApi.js";
import {
  StoryWrapper,
  StoryTitle,
  StoryMeta,
  StoryMetaElement
} from "../styles/StoryStyles.js";
import { mapTime } from "../mappers/mapTime.js";

export const Story = memo(function Story({ storyId }) {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then(data => data && data.url && setStory(data));
  }, [storyId]);

  return story && story.url ? (
    <StoryWrapper data-testid="story">
      <StoryTitle>
        <a href={story.url}>{story.title}</a>
      </StoryTitle>

      <StoryMeta>
        <span data-testid="story-by">
          <StoryMetaElement color="#222">By: </StoryMetaElement>
          {story.by}
        </span>
        <span data-testid="story-time">
          <StoryMetaElement color="#222">Posted: </StoryMetaElement>
          {mapTime(story.time)}
        </span>
      </StoryMeta>
    </StoryWrapper>
  ) : null;
});
