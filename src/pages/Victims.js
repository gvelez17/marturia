import React from 'react';
import MainLayout from '../components/MainLayout';
import blankProfile from '../images/blank-profile-150.png';
import './Victims.scss';

const Victims = () => {
  return (
    <MainLayout>
      <div className="victims page">
        <div className="wrapper">
          <ul className="list">
            {mockData.map(item => (
              <li key={item.id}>
                <div className="col">
                  <img src={blankProfile} alt="victim" />
                </div>
                <div className="col">
                  <div className="name"><span>Name:</span> {item.name}</div>
                  <div className="date-of-birth"><span>Birth date:</span> {item.dateOfBirth}</div>
                  <div className="last-seen-place"><span>Place last seen: </span> {item.lastSeenPlace}</div>
                  <div className="current-status"><span>Current status: </span> {item.currentStatus}</div>
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

const mockData = [
  {
    id: 1,
    name: "John Doe",
    dateOfBirth: "January 20, 1980",
    lastSeenPlace: "Russia",
    currentStatus: "Unknown"
  },
  {
    id: 2,
    name: "Sara Smith",
    dateOfBirth: "December 11, 1950",
    lastSeenPlace: "China",
    currentStatus: "Imprisoned"
  },
  {
    id: 3,
    name: "Mary Doe",
    dateOfBirth: "October 3, 1967",
    lastSeenPlace: "Spain",
    currentStatus: "Deceased"
  },
  {
    id: 4,
    name: "Darrel Poe",
    dateOfBirth: "January 20, 1980",
    lastSeenPlace: "Russia",
    currentStatus: "Unknown"
  },
  {
    id: 5,
    name: "Elizabeth Branch",
    dateOfBirth: "December 11, 1950",
    lastSeenPlace: "China",
    currentStatus: "Imprisoned"
  },
  {
    id: 6,
    name: "Phil Pace",
    dateOfBirth: "October 3, 1967",
    lastSeenPlace: "Spain",
    currentStatus: "Deceased"
  }
];

export default Victims;
