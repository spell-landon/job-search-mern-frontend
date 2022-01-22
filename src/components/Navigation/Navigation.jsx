import React from 'react';
import styles from './Navigation.module.css';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';

function Navigation(props) {
  const { user, setUser } = useContext(UserContext);
  function handleLogout() {
    setUser({ username: '', lastLogIn: '' });
  }

  return (
    <header className={styles.header}>
      <nav>
        <Link to='/' className={styles.title}>
          <h1>Job Search Tracker</h1>
        </Link>

        <div>
          {user.username ? (
            <Link to='/dashboard'>
              <input type='button' value='Dashboard' />
            </Link>
          ) : null}
          {user.username ? (
            <Link to='/add-interview'>
              <input type='button' value='+ Add Interview' />
            </Link>
          ) : null}
          {user.username ? (
            <Link to='/'>
              <input
                type='button'
                value='Logout'
                onClick={() => {
                  handleLogout();
                }}
                className={styles.logoutBtn}
              />
            </Link>
          ) : null}
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
