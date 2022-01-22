import React, { useCallback } from 'react';
import styles from './Dashboard.module.css';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import moment from 'moment';

function Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);
  const [rows, setRows] = useState(application);
  //   const { id } = useParams();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.username) {
      return;
    } else {
      navigate('/login');
    }
  }, [user.username, navigate]);
  const name = user.username.charAt(0).toUpperCase() + user.username.slice(1);

  // AXIOS REQUEST TO DATABASE
  useEffect(() => {
    const handleLoadingTimeOut = setTimeout(() => {
      if (!application.length) {
        setLoading(false);
      }
    }, 5000);

    fetch('http://localhost:3111/applications')
      .then((res) => res.json())
      .then((res) => {
        setApplication(res);
        setRows(res);
      });

    return () => clearTimeout(handleLoadingTimeOut);
  }, [application.length]);

  //   MUI DataGrid
  // Delete a user
  const deleteUser = React.useCallback(
    (id) => () => {
      axios.delete(`http://localhost:3111/applications/${id}`).then((res) => {
        navigate('/dashboard');
      });
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [navigate]
  );

//   const handleSubmit = React.useCallback(
//     (id) => (e) => {
//       setApplication({ ...application, [e.target.id]: e.target.value });
//       axios.put(`http://localhost:3111/applications/${id}`, id).then((res) => {
//         navigate('/dashboard');
//       });
//       setTimeout(() => {
//         setRows((prevRows) => prevRows.filter((row) => row.id !== id));
//       });
//     },
//     [navigate]
//   );

  //   More Info Navigate function
  const moreInfo = React.useCallback(
    (id) => () => {
      navigate(`/applications/${id}`);
    },
    [navigate]
  );

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const usdPrice = {
    type: 'number',
    width: 120,
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    cellClassName: 'font-tabular-nums',
  };
  const dateFormat = {
    type: 'date',
    width: 90,
    valueFormatter: ({ value }) => moment(value).format('L'),
  };

  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
    //   width: 100,
      //   editable: true,
      ...dateFormat,
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 90,
      //   editable: true,
    },
    {
      field: 'company',
      headerName: 'Company',
      width: 110,
      //   editable: true,
    },
    {
      field: 'interviewer',
      headerName: 'Interviewer',
      width: 140,
      //   editable: true,
    },
    {
      field: 'interviewerEmail',
      headerName: 'Interviewer Email',
      flex: 1,
      //   editable: true,
    },
    {
      field: 'jobTitle',
      headerName: 'Job Title',
      width: 160,
      //   editable: true,
    },
    {
      field: 'salary',
      headerName: 'Salary',
      type: 'number',
      width: 110,
      //   editable: true,
      ...usdPrice,
    },
    {
      field: 'actions',
      headerName: 'Delete',
      type: 'actions',
      width: 74,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<i className='far fa-trash-alt'></i>}
          label='Delete'
          onClick={deleteUser(params.id)}
        />,
      ],
    },
    {
      field: 'action',
      headerName: 'More Info',
      type: 'actions',
      width: 93,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<i className='fas fa-info-circle'></i>}
          label='More Info'
          onClick={moreInfo(params.id)}
        />,
      ],
    },
  ];

  if (loading && !application.length) {
    return <h2 className={styles.loading}>Loading...</h2>;
  }
  if (!loading && !application.length) {
    return (
      <h2 className={styles.loading}>
        Oops, something went wrong. Please try again later!
      </h2>
    );
  }

  return (
    <div className={styles.dbContainer}>
      <section>
        <div>
          <h1>Welcome back, {name}!</h1>
          <p>You last logged in on {user.lastLogIn}.</p>
        </div>
      </section>
      <div
        style={{
          height: 'calc(100vh - 150px)',
          width: '100%',
        }}>
        <DataGrid
          getRowId={(rows) => rows._id}
          rows={rows}
          rowHeight={50}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[100]}
          disableSelectionOnClick
          onColumnResize
          onColumnWidthChange
          components={{ Toolbar: GridToolbar }}
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'rgba( 241, 241, 241, 100%)',
            },
            '& .MuiDataGrid-toolbarContainer': {
              backgroundColor: 'rgba( 241, 241, 241, 100%)',
            },
            border: 'none',
          }}
          density='compact'
        //   onCellEditCommit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Dashboard;
