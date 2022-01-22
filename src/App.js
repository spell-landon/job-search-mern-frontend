import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from './UserContext';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import AddInterview from './components/AddInterview/AddInterview';
import Dashboard from './components/Dashboard/Dashboard';
import Application from './components/Application/Application';

function App() {
  //?------------ STATES
  const [user, setUser] = useState({
    username: '',
    lasLogIn: '',
  });
  const [application, setApplication] = useState({
    // date: new Date(),
    time: '',
    company: '',
    interviewer: '',
    interviewerEmail: '',
    jobTitle: '',
    salary: 0,
    secondInterview: true,
    remote: true,
  });

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route
            path='/dashboard'
            element={
              <Dashboard

              />
            }></Route>
          <Route
            path='/add-interview'
            element={
              <AddInterview

              />
            }></Route>
          <Route
            path='/application/:id'
            element={
              <Application

              />
            }></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
