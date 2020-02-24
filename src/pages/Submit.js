import React, { useRef, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import './Submit.scss';

const Submit = () => {
  const nameRef = useRef();

  useEffect(() => {
    document.title = 'Submit Testimony - Testimony Database';
    nameRef.current.focus();
  }, []);

  return (
    <MainLayout>
      <div className="submit page">
        <div className="wrapper">
          <form>
            <section>
              <h1>Your information</h1>
              <div className="row">
                <label htmlFor="user-name">Name*</label>
                <input id="user-name" type="text" ref={nameRef}/>
              </div>
              <div className="row">
                <label htmlFor="user-email">Email*</label>
                <input id="user-email" type="text" />
              </div>
              <div className="row">
                <label htmlFor="user-discovery">Discovery*</label>
                <textarea
                  id="user-discovery"
                  placeholder="How you learned about the victim's status"
                />
              </div>
              <div className="row radio">
                <label>Is this your testimony?*</label>
                <div className="radio-buttons">
                  <label className="radio-label">
                    <input
                      name="testimony"
                      type="radio"
                      value="yes" />
                    <span>Yes</span>
                  </label>
                  <label className="radio-label">
                    <input
                      name="testimony"
                      type="radio"
                      value="no"
                      checked
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </section>
            <section>
              <h1>Victim's information</h1>
              <div className="row">
                <label htmlFor="victim-name">Name*</label>
                <input id="victim-name" type="text" />
              </div>
              <div className="row">
                <label htmlFor="about">About*</label>
                <textarea
                  id="about"
                  placeholder="Short biography of the victim, including place of birth, ethnicity, age or age range, and profession, if known" 
                />
              </div>   
              <div className="row">
                <label htmlFor="detainment">Detainment*</label>
                <textarea
                  id="detainment"
                  placeholder="Information about when the victim was detained. Approximate dates are allowed."
                />
              </div>
              <div className="row">
                <label htmlFor="reason">Reason for Detainment</label>
                <textarea
                  id="reason"
                  placeholder="Official or probable reason"
                />
              </div>
              <div className="row">
                <label htmlFor="location">Current Location</label>
                <textarea
                  id="location"
                  placeholder="Where the victim is now"
                />
              </div> 
              <div className="row">
                <label htmlFor="status">Current Status</label>
                <textarea
                  id="status"
                  placeholder="Any information about the victim's current status. Key terms include disappeared, imprisoned, labor camp, released, emigrated, deceased"
                />
              </div>
              <div className="row">
                <label htmlFor="incidents">Incidents</label>
                <textarea
                  id="incidents"
                  placeholder="Describe any incident(s) the victim was involved in, including when and where it happened"
                />
              </div>
              <div className="row">
                <label htmlFor="additional">Additional Information</label>
                <textarea
                  id="additional"
                  placeholder="Any additional information including links to video testimonies, news articles or videos"
                />
              </div>
              <div className="row">
                <label htmlFor="photo">Victim's Photo</label>
                <input id="photo" type="file" accept="image/*" />
              </div>
              <div className="row">
                <label htmlFor="documents">
                  Documents that prove victim's identity or situation
                </label>
                <input
                  id="documents"
                  name="documents"
                  type="file"
                  accept="image/*,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" multiple
                />
              </div>
              <div className="row">
                <button type="submit" className="btn">Submit</button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Submit;
