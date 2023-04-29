import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #222;
    --color-secondary: #eee;
    --font-family: Arial, Helvetica, sans-serif;
    --font-size: 18px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: var(--font-size);
  }

  body {
    margin: 0;
    padding: 0;
    line-height: 1;
    color: var(--color-primary);
    background-color: var(--color-secondary);
    font-family: var(--font-family);
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;

export const StoriesContainerWrapper = styled.main`
	max-width: 1140px;
	padding: 20px 15px;
	margin: auto;
`;
