/**
 * selectFields - function that selects certain fields from a given object
 * @param {object} data - The object to select fields from
 * @returns {object} An object with the selected fields
 */
export const selectFields = ({ id, by, url, time, title } = {}) => ({
	id,
	by,
	url,
	time,
	title,
});
