//svelte cannot read stores from svelt page, so have to create js file to implement stores.

import { writable } from 'svelte/store';

export const alertMessage = writable('');
export const alertType = writable('');

let timeoutId;

//setting up the alert type and message for conditions. 
export function createAlert(type, message) {
	alertMessage.set(message);
	alertType.set(type);
	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		alertMessage.set();
	}, 5000);
}
