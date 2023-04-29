export const mapTime = (timestamp) => {
	const now = Date.now();
	const seconds = Math.floor((now - timestamp) / 1000);
	const timeIntervals = [
		{ interval: 31536000, label: 'year' },
		{ interval: 2592000, label: 'month' },
		{ interval: 86400, label: 'day' },
		{ interval: 3600, label: 'hour' },
		{ interval: 60, label: 'minute' },
		{ interval: 1, label: 'second' },
	];

	for (let i = 0; i < timeIntervals.length; i++) {
		const { interval, label } = timeIntervals[i];
		const intervalInSeconds = Math.floor(seconds / interval);

		if (intervalInSeconds > 1) {
			return `${intervalInSeconds} ${label}${
				intervalInSeconds !== 1 ? 's' : ''
			} ago`;
		}
	}

	return 'just now';
};
