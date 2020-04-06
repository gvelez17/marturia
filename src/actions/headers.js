export function authorizationHeaders() {
	return {'Authorization': 'Bearer ' + localStorage.getItem('token')}
}
