import React, { useEffect } from 'react';
import './Home.scss';
import MainLayout from '../components/MainLayout';

function Home() {
  useEffect(() => {
    document.title = 'Testimony Database';
  }, []);

  return (
    <MainLayout>
      <div className="home page">
        <div className="wrapper">
          <p>
		  <span className="title">The Testimony Database</span><br/><br/>
		  <u>Mission</u><br/><br/>
		  
		  Providing free, secure, easy to use, online robust technology to help identify missing persons and loved ones, living or deceased. No missing person should be left unaccounted for. Missing someone and not being able to see them is one of the worst feelings. <br/><br/> This website aims to connect families to loved ones who have been reported missing or deceased. Our mission is to subdue the pain of family members who have suffered the loss or disappearance of their loved ones. <br/><br/>
		We hope that you put your sincere trust in us and will let us help you find the people you hold close to your heart. Simply fill out the information in the “Victim”, tab to search for the missing person, or report a missing person by filling out the information in the “Submit” tab. With this tool we hope that your dearest ones will be found. 

         
		  </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
