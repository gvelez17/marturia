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
              <span className="title">The Testimony Database</span><br/>
</p>
   <p>
Welcome. Every person is important here, regardless of birthplace, race, religion, gender or language.  Our mission is to raise up the stories of those who are silenced by force.
</p><p>
This database records testimonies about enforced disappearances and extrajudicial violence.  That is, if someone is harmed or kidnapped by force and cannot go to their government for protection - either because the government itself is involved, corrupt, or ineffective, their story belongs here.  In cases where the judiciary is or may be complicit, cases that have had "trials" may also be included.
</p><p>
You may enter your own story, one you know of first hand, or information from news reports.  You will be prompted for the source of your information and also will have the option to withhold specific names and contacts.  You may also work anonymously with a volunteer of <a href="http://RaisetheVoices.org">Raise the Voices</a>. Please do NOT enter any information that could endanger an individual, we cannot ensure that information entered is absolutely secure. In this case you should contact a volunteer over Signal - see <a href="https://raisethevoices.org">website</a>.
</p>
<p>
We provide as much sources and credentials as possible for the histories here; it will be indicated what the sources or corroborations are.  Journalists and NGOs are welcome to contact us for reports or data exports at <a href="mailto:info@raisethevoices.org">info@raisethevoices.org</a> Volunteers are also welcome!
          </p>
	  
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
