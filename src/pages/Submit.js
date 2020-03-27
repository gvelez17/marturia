import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/MainLayout';
import './Submit.scss';

const Submit = () => {
  const nameRef = useRef();
  const { register, handleSubmit, errors } = useForm()

  const handleFormSubmit = (data) => {
    // console.log(data);
  };

  useEffect(() => {
    document.title = 'Submit Testimony - Testimony Database';
    nameRef.current.focus();
  }, []);

  return (
    <MainLayout>
      <div className="submit page">
        <div className="wrapper">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <section>
              <h1>Your information</h1>
              <div className="row">
                <label htmlFor="name">Name*</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  ref={(input) => {
                    register(input, { required: true });
                    nameRef.current = input;
                  }}
                />
                {errors.name &&
                  <p className="error">Name is required</p>}
              </div>
              <div className="row">
                <label htmlFor="email">Email*</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  ref={register({ required: true })}
                />
                {errors.email &&
                  <p className="error">Email is required</p>}
              </div>
              <div className="row">
                <label htmlFor="discovery">Discovery*</label>
                <textarea
                  id="discovery"
                  name="discovery"
                  placeholder="How you learned about the victim's status."
                  ref={register({ required: true })}
                />
                {errors.discovery &&
                  <p className="error">Discovery is required</p>}
              </div>
              <div className="row radio">
                <label>Is this your testimony?*</label>
                <div className="radio-buttons">
                  <label className="radio-label">
                    <input
                      name="own_testimony"
                      type="radio"
                      value="yes"
                      ref={register({ required: true })}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="radio-label">
                    <input
                      name="own_testimony"
                      type="radio"
                      value="no"
                      defaultChecked
                      ref={register({ required: true })}
                    />
                    <span>No</span>
                  </label>
                </div>
                {errors.own_testimony &&
                  <p className="error radio">This field is required</p>}
              </div>
            </section>
            <section>
              <h1>Victim's information</h1>
              <div className="row">
                <label htmlFor="victim_name">Name*</label>
                <input
                  id="victim_name"
                  name="victim_name"
                  type="text"
                  ref={register({ required: true })}
                />
                {errors.victim_name &&
                  <p className="error">Victim's name is required</p>}
              </div>
              <div className="row">
                <label htmlFor="about">About*</label>
                <textarea
                  id="about"
                  name="about"
                  placeholder="Short biography of the victim, including place of birth, ethnicity, age or age range, and profession, if known."
                  ref={register({ required: true })}
                />
                {errors.about &&
                  <p className="error">About is required</p>}
              </div>
              <div className="row">
                <label htmlFor="detainment">Detainment*</label>
                <textarea
                  id="detainment"
                  name="detainment"
                  placeholder="Information about when the victim was detained. Approximate dates are allowed."
                  ref={register({ required: true })}
                />
                {errors.detainment &&
                  <p className="error">Detainment is required</p>}
              </div>
              <div className="row">
                <label htmlFor="reason_for_detainment">Reason for Detainment</label>
                <textarea
                  id="reason_for_detainment"
                  name="reason_for_detainment"
                  placeholder="Official or probable reason."
                  ref={register}
                />
              </div>
              <div className="row">
                <label htmlFor="detainment_location">Location of Detainment</label>
                <textarea
                  id="detainment_location"
                  name="detainment_location"
                  placeholder="Location where victim  was detained.  Enter unknown if you don't know."
                  ref={register}
                />
              </div>
              <div className="row">
                <label htmlFor="location">Current Location</label>
                <textarea
                  id="location"
                  name="location"
                  placeholder="Where the victim is now. Enter unknown, if you don't know."
                  ref={register}
                />
              </div>
              <div className="row">
                <label htmlFor="status">Current Status</label>
                <textarea
                  id="status"
                  name="status"
                  placeholder="Any information about the victim's current status. Key terms include disappeared, imprisoned, labor camp, released, emigrated, deceased."
                  ref={register}
                />
              </div>
              <div className="row">
                <label htmlFor="additional">Additional Information</label>
                <textarea
                  id="additional"
                  name="additional"
                  placeholder="Any additional information including links to video testimonies, news articles or videos."
                  ref={register}
                />
              </div>
              <div className="row">
                <label htmlFor="photo">Victim's Photo</label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  ref={register}
                />
              </div>
              <div className="row">
                <label htmlFor="documents">
                  Documents that prove victim's identity or situation
                </label>
                <input
                  id="documents"
                  name="documents"
                  type="file"
                  accept="image/*,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  multiple
                  ref={register}
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
