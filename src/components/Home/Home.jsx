import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';

function Home(props) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  function navigateLogin() {
    navigate('/login');
  }
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to Job Search Tracker</h1>
      <p>
        Track the endless job search, store info about upcoming interviews, and
        keep your data secure, all in a fresh new design.
      </p>

      <section>
        <p id={styles.first}>There's a light at the end of the tunnel.</p>
        <p id={styles.second}>Track your job search.</p>
        <p id={styles.third}>Track your future.</p>
      </section>

      {user.username ? (
        <Link to='/dashboard'>
          <button>Dashboard</button>
        </Link>
      ) : (
        <button onClick={navigateLogin}>Login</button>
      )}
    </div>
  );
}

export default Home;
