import React, { useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout';
import ViewSidebar from '../components/ViewSidebar';
import ViewVictimItem from '../components/ViewVictimItem';
import VictimMedia from '../components/VictimMedia';
import Incident from '../components/Incident';
import VictimDetails from '../components/VictimDetails';
import './View.scss';

const categories = [
	"Victim Details",
	"Victim Media",
	"Incident List"
];

const ViewVictim = (props) => {
	const [vicData, setVicData] = useState(null);
	const [incidents, setIncidents] = useState(null);
	const [translations, setTranslations] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [victimDNE, setVictimDNE] = useState(false);
	const [shown, setShown] = useState({
		"Victim Details": true,
		"Victim Media": true,
		"Incident List": true,
	});

	useEffect(() => {
		fetch(process.env.REACT_APP_API_BASE + 'victims?idvictim=' + String(props.match.params.id))
		.then(res => res.json())
		.then(data => {
			if(data.status === 200) {
				setVicData(data.victim);
				setIsLoaded(true);
			} else if(data.status === 404) {
				setVictimDNE(true);
			} else {
				//something went wrong
				setVictimDNE(true);
			}
		})
		.catch(err => console.log(err))

		fetch(process.env.REACT_APP_API_BASE + 'incidents?idvictim=' + String(props.match.params.id))
		.then(res => res.json())
		.then(data => {
			if(data.status === 200) {
				console.log(data)
				setIncidents(data.incidents)
			} else if(data.status === 400) {
				//params error
			} else {
				//something went wrong
			}
		})
		.catch(err => console.log(err))
		
		fetch(process.env.REACT_APP_API_BASE + 'victim-translations?idvictim=' + String(props.match.params.id))
		.then(res => res.json())
		.then(data => {
			if(data.status === 200) {
				console.log(data)
				setTranslations(data.translations)
			} else if(data.status === 400) {
				//params error
			} else {
				//something went wrong
			}
		})
		.catch(err => console.log(err))
	}, [])

	let content;
	if(victimDNE) {
		content = (
			<div>
				<p> Victim with this ID does not exist </p>
			</div>
		)
	} else if(isLoaded) {
		 content = (
			<MainLayout>
				<div className='view-container'>
					<div>
						<ViewVictimItem
							category={"Victim Details"}
							shown={shown}
							setShown={setShown}
							info={<VictimDetails data={translations}/>}							
							/>
						<ViewVictimItem
						 	category={"Victim Media"}
							shown={shown}
							setShown={setShown}
							info={<VictimMedia/>}/>
						 
						<ViewVictimItem
						 	category={"Incident List"}
							shown={shown}
							setShown={setShown}
							info={<Incident victimId={props.match.params.id} data={incidents} />}/>
					</div>
					<ViewSidebar data={vicData}/>
				</div>
			</MainLayout>
		)
	} else {
		content = (
			<div>
				<p> loading... </p>
			</div>
		)
	}

	return content
}

export default ViewVictim
