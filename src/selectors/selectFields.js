/**
 * Selects specific fields from an object and returns a new object with the selected fields.
 * @param {Object} object - The object to select fields from.
 * @returns {Object} A new object with the selected fields.
 */
export const selectFields = ({ id, by, url, time, title } = {}) => {
	// Destructure the input object and select specific fields.
	// If no object is provided, default to an empty object.
	return {
		id,
		by,
		url,
		time,
		title,
	};
};
