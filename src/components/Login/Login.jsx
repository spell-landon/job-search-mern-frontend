import React from 'react';
import styles from './Login.module.css';
import { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import loginIcon from '../../assets/login.png';

function Login(props) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [searchString, setSearchString] = useState('');
  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    setSearchString(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newDate = new Date();
    const dateDay = moment(newDate).format('MMMM Do YYYY');
    const dateTime = moment(newDate).format('h:mm:ss a');
    setUser({ username: name, lastLogIn: `${dateDay} at ${dateTime}` });
    setName('');
    setSearchString('');
    navigate('/dashboard');
  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        {!user.username ? (
          <form onSubmit={handleSubmit}>
            <img src={loginIcon} alt='login icon' width='250px' />
            <label htmlFor='username'>Username:</label>
            <input
              id='username'
              type='text'
              onChange={handleChange}
              value={searchString}
              autoComplete='off'
              required
              placeholder='just type whatever -> enter'
            />
            <label htmlFor='password'>Password:</label>
            <input
              id='password'
              type='text'
              // onChange={handleChange}
              value=''
              autoComplete='off'
              placeholder='does not work, yet.'
            />
            <input type='submit' value='Login' id={styles.loginBtn} />
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default Login;
