import React, { useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout';
import {debounce} from "lodash";
import {getAge} from '../utils/utils';
import './Victims.scss';

import data from '../data/countries.json';

const Victims = () => {
	const [victimList, setVictimList] = useState([]);
	const [displayList, setDisplayList] = useState([]);
	const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    document.title = 'Victims List - Testimony Database';

		//for partially loading the reports if the number of reports is too large
		//window.onscroll = debounce(() => {
      //if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        //loadMoreData();
      //}
    //}, 100);

		fetch(process.env.REACT_APP_API_BASE + 'victims')
		.then(res => res.json())
		.then(data => {
			let vl = []
			let cl = []
			data.victims.forEach((victim) => {
				if (!cl.includes(victim.country)) {
					cl.push(victim.country)
				}

				vl.push({
					"id": victim.ID,
					"name": victim.name,
					"status": victim.current_status,
				  "location": victim.country,
					"age": getAge(victim.date_of_birth)
				  })
			})
			setVictimList(vl)
			setDisplayList(vl)
			setCountryList(cl)
			console.log(victimList)
		})
		//might want to redirect to an error page becuase nothign will show
		.catch(err => console.log(err))
  }, []);

  return (
    <MainLayout>
      <div className="victims page">
        <div className="wrapper">
          <div className="searchSelect">
            <form>
              <input
                className="search"
                type="search"
                placeholder="Search..."
              />
            </form>
            <div className="selectSubmit">
               <select id="countries" defaultValue="none">
                  <option value="none" disabled hidden>
                    Select a country
                  </option>
                {countryList.map(item => (
                  <option
                    key={item}
                    value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn">Submit</button>
            </div>
          </div>
          <ul className="list">
            {displayList.map((item, index) => (
              <li key={item.id}>
                <div className="col">
                  <img
                    src={`https://i.pravatar.cc/160?img=${idsOfImages[index]}`}
                    alt="victim"
                  />
                </div>
                <div className="col">
                  <div className="name"><span>Name:</span> {item.name}</div>
                  <div className="age"><span>Age:</span> {item.age}</div>
                  <div className="location"><span>Location: </span> {item.location}</div>
                  <div className="status"><span>Status: </span> {item.status}</div>
                  <div className="more-btn">
                    <a href="/">More</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

const idsOfImages = [68, 47, 63, 51, 35, 17];
const mockData = [
  {
    id: 1,
    name: "John Doe",
    age: "42",
    location: "Baghdad, Iraq",
    status: "Unknown"
  },
  {
    id: 2,
    name: "Sara Smith",
    age: "50 - 55",
    location: "China",
    status: "Imprisoned"
  },
  {
    id: 3,
    name: "Mary Doe",
    age: "20",
    location: "Madrid, Spain",
    status: "Deceased"
  },
  {
    id: 4,
    name: "Darrel Poe",
    age: "35 - 40",
    location: "Colombia",
    status: "Unknown"
  },
  {
    id: 5,
    name: "Elizabeth Branch",
    age: "65",
    location: "Portugal",
    status: "Imprisoned"
  },
  {
    id: 6,
    name: "Phil Pace",
    age: "77 - 83",
    location: "Spain",
    status: "Deceased"
  }
];

export default Victims;
