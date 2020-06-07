import {authContentTypeHeaders} from './headers'
import {getISOfromDatepicker} from '../utils/utils'
export const submitMedia = (fileObj, id) => {
}

export const submitVictimTranslation = (victimTranslationObj, id) => {
	fetch(process.env.REACT_APP_API_BASE + 'victims/' + String(id) + '/victim-translations', {
		method: "POST",
		headers: authContentTypeHeaders(),
		body: JSON.stringify(victimTranslationObj)
	})
	.then(res => res.json())
	.then(data => {
		console.log(data)
	})
	.catch(err => console.log(err))
}

export const submitIncidentTranslation = (translation, id) => {
	fetch(process.env.REACT_APP_API_BASE + 'incidents/' + String(id) + '/victim-translations', {
		method: "POST",
		headers: authContentTypeHeaders(),
		body: JSON.stringify(translation)
	})
	.then(res => res.json())
	.then(data => {
		console.log(data)
	})
	.catch(err => console.log(err))
}

export const submitIncident = (incidentObj, language, id) => {
	incidentObj['date_of_incident'] = getISOfromDatepicker(incidentObj['date_of_incident'])
	incidentObj['location'] = incidentObj['incident_location']
	delete incidentObj['incident_location']
	console.log(incidentObj)
	fetch(process.env.REACT_APP_API_BASE + 'victims/' + String(id) + '/incidents', {
		method: "POST",
		headers: authContentTypeHeaders(),
		body: JSON.stringify(incidentObj)
	})
	.then(res => res.json())
	.then(data => {
		console.log(data)
		let translationObj = {
			'language': language,
			"narrative_of_incident": incidentObj['incident_narrative']
		}
		submitIncidentTranslation(translationObj, data.incident.ID)
	})
	.catch(err => console.log(err))
}

export const submitAllIncidents = (incidentList, incidentData, victimID, language) => {
	incidentList.forEach(index => {
		submitIncident(incidentData[index], language, victimID)
	})
}

export const constructReportObj = (data) => {
	console.log(data)
	if (data.photo && data.photo.length !== 0) {
		submitMedia(data.photo, data.victim.ID)
	}
	if (data.documents && data.documents.length !== 0) {
		submitMedia(data.documents, data.victim.ID)
	}

	 let victimTranslationObj = {
	  "language": data.language,
	  "gender": data.gender,
	  "nationality": data.country,
	  "current_status": data.status,
	  "languagues_spoken": data.language
  }

  console.log(data)

	let reporterInfoObj = {
		"name_of_reporter" : data.name,
    "email_of_reporter" : data.email,
    "discovery" : data.discovery,
    "is_direct_testimony": (data.own_testimony === 'yes')
	}

  let reportObj = {
	  "name": data.victim_name,
		"current_status": data.status,
		"gender": data.gender,
		"country": data.country,
		"date_of_birth": getISOfromDatepicker(data.birth_date),
	  "last_seen_place": data.detainment_location,
		"Report": reporterInfoObj,
	  "VictimTranslation": [victimTranslationObj],
	  "Incident": []
  }
  return reportObj
}
