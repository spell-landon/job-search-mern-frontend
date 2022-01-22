import React, { useState } from 'react';
import styles from './AddInterview.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function AddInterview(props) {
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    date: '',
    time: '',
    company: '',
    interviewer: '',
    interviewerEmail: '',
    jobTitle: '',
    salary: 0,
    secondInterview: true,
    remote: true,
  });

  function createNewApplication(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3111/applications/`, application)
      .then((res) => {
        console.log(res);
      });
    navigate('/dashboard');
  }
  const handleChange = (e) => {
    setApplication({ ...application, [e.target.id]: e.target.value });
  };

  return (
    <div className={styles.addContainer}>
      <section className={styles.addInterview}>
        <h1>Track a new interview</h1>
        <form className={styles.jobInput} onSubmit={createNewApplication}>
          {/* Date */}
          <label htmlFor='date'>Interview Date: </label>
          <input
            type='date'
            id='date'
            value={application.date}
            onChange={handleChange}
            autoComplete='off'
          />
          {/* Time */}
          <label htmlFor='time'>Interview time: </label>
          <input
            type='text'
            id='time'
            value={application.time}
            onChange={handleChange}
            autoComplete='off'
          />
          {/* Company */}
          <label htmlFor='company'>Company: </label>
          <input
            type='text'
            id='company'
            value={application.company}
            onChange={handleChange}
            autoComplete='off'
          />
          {/* Interviewer */}
          <label htmlFor='interviewer'>Interviewer Name: </label>
          <input
            type='text'
            id='interviewer'
            value={application.interviewer}
            onChange={handleChange}
            autoComplete='off'
          />
          {/* Interviewer Email */}
          <label htmlFor='interviewerEmail'>Interviewer Email: </label>
          <input
            type='text'
            id='interviewerEmail'
            value={application.interviewerEmail}
            onChange={handleChange}
            autoComplete='off'
          />
          {/* Job Title */}
          <label htmlFor='jobTitle'>Job Title: </label>
          <input
            type='text'
            id='jobTitle'
            value={application.jobTitle}
            onChange={handleChange}
            autoComplete='off'
          />
          {/* Salary */}
          <label htmlFor='salary'>Salary: </label>
          <input
            type='number'
            id='salary'
            value={application.salary}
            onChange={handleChange}
            autoComplete='off'
          />
          {/* <p>No commas, or currency symbols</p> */}
          {/* Remote */}
          {/* <label htmlFor='remote'>Option For Remote Work? </label>
          <div className={styles.remoteContainer}>
            <div className={styles.remoteYes}>
              <input
                type='radio'
                name='remote'
                id='remote-yes'
                value='Yes'
                onChange={remoteChange}
              />
              <label htmlFor='remote-yes'>Yes</label>
            </div>
            <div className={styles.remoteNo}>
              <input
                type='radio'
                name='remote'
                id='remote-no'
                value='No'
                onChange={remoteChange}
              />
              <label htmlFor='remote-no'>No</label>
            </div>
          </div> */}
          {/* Second Interview */}
          {/* <label htmlFor='second'>
            Did you get asked to come back for a second interview?{' '}
          </label>
          <div className={styles.secondContainer}>
            <div className={styles.secondYes}>
              <input type='radio' name='second' id='second-yes' value='Yes' />
              <label htmlFor='second-yes'>Yes</label>
            </div>
            <div className={styles.secondNo}>
              <input type='radio' name='second' id='second-no' value='No' />
              <label htmlFor='second-no'>No</label>
            </div>
          </div> */}
          {/* Submit */}
          <input type='submit' value='Add' id={styles.addBtn} />
        </form>
      </section>
    </div>
  );
}

export default AddInterview;
