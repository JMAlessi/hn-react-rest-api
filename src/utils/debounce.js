/**
 * Debounces a function, ensuring it is only called after a certain amount of time has passed since the last invocation.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds before the function is invoked.
 * @param {boolean} immediate - Whether to trigger the function immediately on the leading edge (true) or the trailing edge (false) of the debounce.
 * @returns {Function} - The debounced function.
 */
export const debounce = (func, wait, immediate) => {
	let timeout;

	return function (...args) {
		const context = this;
		const callNow = immediate && !timeout;
		const later = () => {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) {
			func.apply(context, args);
		}
	};
};
