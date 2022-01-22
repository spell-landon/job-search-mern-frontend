import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Application.module.css';

function Application(props) {
  const { id } = useParams();

  const navigate = useNavigate();
  const [application, setApplication] = useState(null);

  async function getApplication() {
    try {
      const response = await fetch(`http://localhost:3111/applications/${id}`);
      const data = await response.json();
      console.log(data);
      setApplication(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getApplication();
    return setApplication(null);
  }, []);

  useEffect(() => {
    console.log(application);
  }, []);
  if (!application) {
    return <h1>Loading...</h1>;
  }
  return (
    <section className={styles.appContainer}>
      <h2>{application.company} Interview</h2>
      <div className={styles.appInfo}>
        <p>
          Date: <span>{application.date}</span>
        </p>
        <p>
          Time of Appointment: <span>{application.time}</span>
        </p>
        <p>
          Interviewer: <span>{application.interviewer}</span>
        </p>
        <p>
          Interviewer Email: <span>{application.interviewerEmail}</span>
        </p>
        <p>
          Position Applied For: <span>{application.jobTitle}</span>
        </p>
        <p>
          Position Salary: <span>${application.salary}</span>
        </p>
        <p>
          Remote: <span>{application.remote ? 'Yes' : 'No'}</span>
        </p>
        <p>
          Second Interview:{' '}
          <span>{application.secondInterview ? 'Yes' : 'No'}</span>
        </p>
      </div>
      <button>Edit</button>
      <button>Delete</button>
    </section>
  );
}

export default Application;
