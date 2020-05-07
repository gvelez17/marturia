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
							category={categories[0]}
							shown={shown}
							setShown={setShown}
							info={<VictimDetails/>}/>
						<ViewVictimItem
						 	category={categories[1]}
							shown={shown}
							setShown={setShown}
							info={<VictimMedia/>}/>
						<ViewVictimItem
						 	category={categories[2]}
							shown={shown}
							setShown={setShown}
							info={<Incident/>}/>
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
