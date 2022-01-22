import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Application.module.css'

function Application({ application }) {
  //   const { id } = useParams();

  //   const navigate = useNavigate();
  //   const [application, setApplication] = useState(null);

  //   async function getApplication() {
  //     try {
  //       const response = await fetch(`http://localhost:3111/applications/${id}`);
  //       const data = await response.json();
  //       console.log(data);
  //       setApplication(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   useEffect(() => {
  //     getApplication();
  //     return setApplication(null);
  //   }, []);

//   useEffect(() => {
//     console.log(application);
//   }, []);
  if (!application) {
    return <h1>Loading...</h1>;
  }
  return (
    <li className={styles.listItem}>
      <p>{application.date}</p>
      <p>{application.time}</p>
      <p>{application.company}</p>
      <p>{application.interviewer}</p>
      <p>{application.interviewerEmail}</p>
      <p>{application.jobTitle}</p>
      <p>{application.salary}</p>
      <p>{application.remote}</p>
      <p>{application.secondInterview}</p>
    </li>
  );
}

export default Application;
