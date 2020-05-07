import React, { useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import {debounce} from "lodash";
import {getAge} from '../utils/utils';
import './Victims.scss';
import data from '../data/countries.json';

const queryString = require('query-string');

const Victims = (props) => {
	const [victimList, setVictimList] = useState([]);
	const [isSearch, setIsSearch] = useState(false);
	const [name, setName] = useState(null);
	const [status, setStatus] = useState(null);
	const [country, setCountry] = useState(null);


	const constructQStr = (name, country, status) => {
		let qstr = '?';

		if(name) {
			qstr += "victim-name=" + name + "&";
		} else {
			qstr += "victim-name=" + "&";
		}

		if(country) {
			qstr += "country=" + country + "&";
		} else {
			qstr += "country=all" + "&";
		}

		if(status) {
			qstr += "status=" + status;
		} else {
			qstr += "status=all";
		}
		return qstr
	}

  useEffect(() => {
    document.title = 'Victims List - Testimony Database';

		//for partially loading the reports if the number of reports is too large
		//window.onscroll = debounce(() => {
      //if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        //loadMoreData();
      //}
    //}, 100);
		let query = queryString.parse(props.location.search);
		console.log(query)
		let qstr = constructQStr(query.name, query.country, query.status);
		console.log(qstr)
		fetch(process.env.REACT_APP_API_BASE + 'victims'+ qstr)
		.then(res => res.json())
		.then(data => {
			if(data.status === 400) {
				//params error
				alert('parameter error')
			} else if(data.status === 200) {
				let vl = []
				console.log(data)
				data.victim.forEach((victim) => {
					vl.push({
						"id": victim.ID,
						"name": victim.name,
						"status": victim.current_status,
					  "location": victim.country,
						"age": getAge(victim.date_of_birth)
					  })
				})
				setVictimList(vl)
			} else {
				//something went wrong
				alert('something went wrong')
			}

		})
		//might want to redirect to an error page becuase nothign will show
		.catch(err => console.log(err))
  }, []);

	let content;

	if (isSearch) {
		let qstr = constructQStr(name, country, status);
		content = (<Redirect to={'/victims' + qstr}/>)
		window.location.reload()
	} else {
		content = (
	    <MainLayout>
	      <div className="victims page">
	        <div className="wrapper">
	          <div className="searchSelect">
	            <form
								onSubmit={(e) => e.preventDefault()}>
	              <input
	                className="search"
	                type="search"
	                placeholder="Search..."
									onChange={(e) => setName(e.target.value)}
	              />

	            </form>
							<form
								onSubmit={(e) => e.preventDefault()}>
								<input
	                className="status"
	                placeholder="Status..."
									onChange={(e) => setStatus(e.target.value)}
	              />
							</form>
	            <div className="selectSubmit">
								<select
									id="countries"
									defaultValue="none"
									onChange={(e) => setCountry(e.target.value)}>
									 <option value="none" disabled hidden>
										 Select a country
									 </option>
								 {data.countries.map(item => (
									 <option
										 key={item.country}
										 value={item.country}>
										 {item.country}
									 </option>
								 ))}
							 </select>
							 <button
							   type="submit"
								 className="btn"
								 onClick={() => setIsSearch(true)}>Submit</button>
	            </div>
	          </div>
	          <ul className="list">
	            {victimList.map((item, index) => (
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
	                    <Link to={'/view/' + String(item.id)}> MORE </Link>
	                  </div>
	                </div>
	              </li>
	            ))}
	          </ul>
	        </div>
	      </div>
	    </MainLayout>
	  );
	}

  return content;
};

const idsOfImages = [68, 47, 63, 51, 35, 17];

export default Victims;
