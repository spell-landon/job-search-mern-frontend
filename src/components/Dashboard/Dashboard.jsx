import React from 'react';
import styles from './Dashboard.module.css';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Application from '../Application/Application';

function Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);

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
      });

    return () => clearTimeout(handleLoadingTimeOut);
  }, [application.length]);

  if (loading && !application.length) {
    return <h2>Loading...</h2>;
  }
  if (!loading && !application.length) {
    return <h2>Oops, something went wrong. Please try again later!</h2>;
  }

  // MUI DataGrid
  //   const [rows, setRows] = useState(application);
  //   const deleteUser = React.useCallback(
  //     (id) => () => {
  //       setTimeout(() => {
  //         setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  //       });
  //     },
  //     []
  //   );
  //   const currencyFormatter = new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD',
  //   });
  //   const usdPrice = {
  //     type: 'number',
  //     width: 120,
  //     valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
  //     cellClassName: 'font-tabular-nums',
  //   };
  //   const columns = [
  //     {
  //       field: 'date',
  //       headerName: 'Date',
  //       type: 'date',
  //       width: 110,
  //       editable: true,
  //     },
  //     {
  //       field: 'time',
  //       headerName: 'Time',
  //       width: 110,
  //       editable: true,
  //     },
  //     {
  //       field: 'company',
  //       headerName: 'Company',
  //       width: 110,
  //       editable: true,
  //     },
  //     {
  //       field: 'interviewer',
  //       headerName: 'Interviewer',
  //       width: 140,
  //       editable: true,
  //     },
  //     {
  //       field: 'interviewerEmail',
  //       headerName: 'Interviewer Email',
  //       flex: 1,
  //       editable: true,
  //     },
  //     {
  //       field: 'jobTitle',
  //       headerName: 'Job Title',
  //       width: 160,
  //       editable: true,
  //     },
  //     {
  //       field: 'salary',
  //       headerName: 'Salary',
  //       type: 'number',
  //       width: 110,
  //       editable: true,
  //       ...usdPrice,
  //     },
  //     {
  //       field: 'actions',
  //       headerName: 'Delete',
  //       type: 'actions',
  //       getActions: (params) => [
  //         <GridActionsCellItem
  //           icon={<i className='far fa-trash-alt'></i>}
  //           label='Delete'
  //           onClick={deleteUser(params.id)}
  //         />,
  //       ],
  //     },
  //   ];

  return (
    <div className={styles.dbContainer}>
      <section>
        <div>
          <h1>Welcome back, {name}!</h1>
          <p>You last logged in on {user.lastLogIn}.</p>
        </div>
      </section>
      {/* <div
        style={{
          height: 'calc(100vh - 150px)',
          width: '100%',
        }}>
        <DataGrid
          rows={application}
          rowHeight={50}
          columns={columns}
          pageSize={100}
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
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: 'rgba( 241, 241, 241, 100%)',
            },
            border: 'none',
          }}
          density='compact'
          editMode='row'
        />
      </div> */}
      <ul>
        {application.map((app) => (
          <Application key={app._id} application={app} />
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
