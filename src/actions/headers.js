export function authorizationHeaders() {
	return {'Authorization': 'Bearer ' + localStorage.getItem('token')}
}

export function authContentTypeHeaders() {
	let headers = {
		'Authorization': 'Bearer ' + localStorage.getItem('token'),
		'Content-Type': 'application/json'
	}
	return headers
}
