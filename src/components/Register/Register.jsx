import React from 'react';
import styles from './Register.module.css';
import { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import loginIcon from '../../assets/login.png';

function Login(props) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    const newDate = new Date();
    const dateDay = moment(newDate).format('MMMM Do YYYY');
    const dateTime = moment(newDate).format('h:mm:ss a');
    setUser({ ...user, lastLogIn: `${dateDay} at ${dateTime}` });
    navigate('/login');
  }
  return (
    <div className={styles.registerContainer}>
      <div className={styles.register}>
        {!user.username ? (
          <form onSubmit={handleSubmit}>
            <img src={loginIcon} alt='register icon' width='250px' />
            <label htmlFor='name'>Name:</label>
            <input
              id='name'
              type='text'
              onChange={handleChange}
              value={user.name}
              autoComplete='off'
              required
              // placeholder='just type whatever -> enter'
            />
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='email'
              onChange={handleChange}
              value={user.email}
              autoComplete='off'
              required
              // placeholder='just type whatever -> enter'
            />
            <label htmlFor='password'>Password:</label>
            <input
              id='password'
              type='password'
              onChange={handleChange}
              value={user.password}
              autoComplete='off'
              // placeholder='does not work, yet.'
            />
            <input type='submit' value='Register' id={styles.registerBtn} />
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default Login;
