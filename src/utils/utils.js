export function getISOfromDatepicker(date) {
	if(!date)
		return null
	let iso = "T00:00:00+00:00"
	return date + iso
}

//date is of type iso string
export function getMMDDYYYYfromISO(date) {
	return date.slice(0, 10)
}

//date is of type iso string
export function getAge(date) {
	let parsed = Date.parse(date)
	let diff = Date.now() - parsed
	let ageDate = new Date(diff)
	return Math.abs(ageDate.getUTCFullYear() - 1970)
}

//checking to see if the token is expired
export function tokenIsStillValid() {
	let expirationToken = localStorage.getItem('expiration')
	if(!expirationToken || expirationToken ==="undefined")
		return false
	let exp = Date.parse(expirationToken)
	let now = Date.now()
	if(now > exp) {
		return false
	}
	return localStorage.getItem('token') !== null
}
