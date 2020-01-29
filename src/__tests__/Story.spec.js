import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Story } from "../components/Story.js";
import { singularStory } from "../fixtures";
import { getStory } from "../services/hnApi.js";

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock("../services/hnApi.js", () => ({
  getStory: jest.fn()
}));

test("renders the story component with content", async () => {
  getStory.mockImplementation(() => Promise.resolve(singularStory));

  const { getByText, getByTestId } = render(<Story storyId="1" />);

  await waitForElement(() => [
    expect(getByTestId("Story")).toBeTruthy(),
    expect(getByText("Tarnished: Google Responds")).toBeTruthy(),
    expect(getByTestId("story-by").textContent).toEqual("By: Karl Hadwen")
  ]);
});
