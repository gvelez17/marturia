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
	  "health_status": data.health_status,
	  "health_issues": data.health_issues,
	  "profession": data.profession,
	  "languagues_spoken": data.language,
	  "about_the_victim": data.about,
	  "additional_information": data.additional
  }

  console.log(data)

	let reporterInfoObj = {
		"name_of_reporter" : data.name,
    "email_of_reporter" : data.email,
    "discovery" : data.discovery,
    "is_direct_testimony": (data.own_testimony === 'yes')
	}
	
	let incidentTranslationObj = {
		"language" : "en",
		"narrative_of_incident" : data.incident_narrative
		
	}
	let incidentObj = {
		"date_of_incident" : getISOfromDatepicker(data.date_of_incident),
		"location" : data.incident_location,
		"IncidentTranslation" : [incidentTranslationObj]
				
	}

  let reportObj = {
	  "name": data.victim_name,
	  "legal_name": data.legal_name,
	  "aliases": data.aliases,
	  "place_of_birth" :data.place_of_birth,
		"current_status": data.status,
		"gender": data.gender,
		"country": data.country,
		"date_of_birth": getISOfromDatepicker(data.birth_date),
	  "last_seen_date": getISOfromDatepicker(data.detainment_date),
	  "last_seen_place": data.detainment_location,
		"Report": reporterInfoObj,
	  "VictimTranslation": [victimTranslationObj],
	  "Incident": [incidentObj]
  }
  return reportObj
}
