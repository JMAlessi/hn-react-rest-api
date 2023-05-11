/**
 * Maps a timestamp to a human-readable time ago format.
 * @param {number} timestamp - The timestamp to convert.
 * @returns {string} The formatted time ago string.
 */
export const mapTime = (timestamp) => {
	// Calculate the difference in seconds between the current time and the given timestamp.
	const now = Date.now();
	const seconds = Math.floor((now - timestamp) / 1000);

	// Define time intervals in descending order.
	const timeIntervals = [
		{ interval: 31536000, label: 'year' },
		{ interval: 2592000, label: 'month' },
		{ interval: 86400, label: 'day' },
		{ interval: 3600, label: 'hour' },
		{ interval: 60, label: 'minute' },
		{ interval: 1, label: 'second' },
	];

	// Iterate through the time intervals and find the appropriate interval.
	for (let i = 0; i < timeIntervals.length; i++) {
		const { interval, label } = timeIntervals[i];
		const intervalInSeconds = Math.floor(seconds / interval);
		// If the interval is greater than 1, construct the time ago string with the appropriate label.
		if (intervalInSeconds > 1) {
			return `${intervalInSeconds} ${label}${
				intervalInSeconds !== 1 ? 's' : ''
			} ago`;
		}
	}
	// If no appropriate interval is found, return 'just now'.
	return 'just now';
};
