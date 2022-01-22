import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Application.module.css';

function Application(props) {
  const { id } = useParams();

  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [modal, setModal] = useState(false);

  // fetch data from api by id
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
  // fetch data when component mounts
  useEffect(() => {
    getApplication();
    return setApplication(null);
  },[]);

  const handleChange = (event) => {
    setApplication({ ...application, [event.target.id]: event.target.value });
  };

  const editShowPage = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3111/applications/${id}`, application)
      .then((res) => {
        console.log(res);
        setModal(false);
      });
  };
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3111/applications/${id}`)
      .then((res) => {
        console.log(res);
        navigate('/dashboard');
      });
  };

  if (!application) {
    return <h1>Loading...</h1>;
  }
  return (
    <section className={styles.appContainer}>
      {modal ? (
        <div className={styles.modal}>
          <h2>Editing {application.company} Interview</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              onChange={handleChange}
              id='date'
              value={application.date}
            />
            <label htmlFor='time'>Time</label>
            <input
              type='time'
              onChange={handleChange}
              id='time'
              value={application.time}
            />
            <label htmlFor='interviewer'>Interviewer</label>
            <input
              type='text'
              onChange={handleChange}
              id='interviewer'
              value={application.interviewer}
            />
            <label htmlFor='interviewerEmail'>Interviewer Email</label>
            <input
              type='text'
              onChange={handleChange}
              id='interviewerEmail'
              value={application.interviewerEmail}
            />
            <label htmlFor='jobTitle'>Job Title</label>
            <input
              type='text'
              onChange={handleChange}
              id='jobTitle'
              value={application.jobTitle}
            />
            <label htmlFor='salary'>Salary</label>
            <input
              type='text'
              onChange={handleChange}
              id='salary'
              value={application.salary}
            />
            <label htmlFor='remote'>Remote</label>
            <input
              type='text'
              onChange={handleChange}
              id='remote'
              value={application.remote}
            />
            <label htmlFor='secondInterview'>Second Interview</label>
            <input
              type='text'
              onChange={handleChange}
              id='secondInterview'
              value={application.secondInterview}
            />
            <button type='submit'>Submit</button>
            <button type='button' onClick={closeModal}>
              Close
            </button>
          </form>
        </div>
      ) : (
        <>
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
          <button onClick={editShowPage}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </section>
  );
}

export default Application;
