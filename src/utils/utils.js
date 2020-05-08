export function getISOfromDatepicker(date) {
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
