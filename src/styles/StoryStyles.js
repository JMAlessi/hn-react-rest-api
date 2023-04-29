import styled from 'styled-components';

export const StoryWrapper = styled.section`
	padding-top: 10px;
	margin-bottom: 20px;
	border-top: 1px solid #ccc;

	&:first-of-type {
		border-top: 0;
	}

	&:last-of-type {
		margin-bottom: 0;
		padding-bottom: 0;
	}
`;

export const StoryTitle = styled.h1`
	margin-bottom: 5px;
	font-size: 18px;
	line-height: 1.8;
	margin: 0;
	text-decoration: none;

	a {
		color: #0080ff;
		background-color: #fce205;
		text-decoration: none;
	}

	a:hover {
		color: #0f52ba;
		text-decoration: underline;
	}
`;

export const StoryMeta = styled.div`
	font-style: italic;
	display: flex;
	flex-direction: row;
	align-items: center;

	> span:first-child {
		margin-right: 10px;
	}

	> span:not(:first-child):before {
		content: '‣';
		margin: 0 7px;
	}

	.story__meta-bold {
		font-weight: bold;
	}
`;

export const StoryMetaElement = styled.span`
	font-weight: bold;
	color: ${({ color }) => color || 'red'};
`;
