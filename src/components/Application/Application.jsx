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
      <div>Date: {application.date}</div>
      <div>Time of Appointment: {application.time}</div>
      <div>Interviewer: {application.interviewer}</div>
      <div>Interviewer Email: {application.interviewerEmail}</div>
      <div>Position Applied For: {application.jobTitle}</div>
      <div>Position Salary: {application.salary}</div>
      <div>Remote: {application.remote}</div>
      <div>Second Interview: {application.secondInterview}</div>
    </section>
  );
}

export default Application;
