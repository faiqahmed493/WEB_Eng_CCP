import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios'

const Admin = () => {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {

      const fetchAllData = async()=>{
        setLoader(true)
        try{
          const results = await axios.get('/api/resume/get');
          console.log(results.data.resumes)
          setData(results.data.resumes)
        }catch(err){
          console.log(err)
          alert("Something Went Wrong")
        }finally{
          setLoader(false)
        }
      }

    fetchAllData();

  }, []);

  return (
    <div className={styles.Admin}>

      <div className={styles.header}>
        {/* <h1>Admin Panel</h1> */}
        <p>Manage and monitor resume analysis data</p>
      </div>

      <div className={styles.grid}>

        {loader && (
          <>
            <Skeleton variant="rectangular" width={260} height={300} />
            <Skeleton variant="rectangular" width={260} height={300} />
            <Skeleton variant="rectangular" width={260} height={300} />
          </>
        )}

        {/* {!loader && data.map((item) => (
          <div key={item.id} className={styles.card}>

            <h3>{item.name}</h3>
            <p>{item.email}</p>

            <div className={styles.score}>
              Score: {item.score}%
            </div>
            <p></p>

          </div>
        ))} */}

        {/* {
          data.map((item, index) => {
            return (
            <div className={styles.card}>
            <h2 style={{color: "black" }}>{item?.user?.name}</h2>
            <p style={{color: "blue" }}>{item?.user?.email}</p>
            <h3>Score : {item.score}%</h3>
            <p>{item.feedback}</p>
            </div>
            );
          })
      } */}

      {
        data.map((item) => {
          return(
          
          <div key={item._id} className={styles.card}>

          <h2  style={{color: "black" }}>{item?.user?.name}</h2>
          <p style={{color: "#2563eb" }}>{item?.user?.email}</p>
          <h3>Score: {item.score}%</h3>
          <p>{item.feedback}</p>

          </div>
          )
        })
    }

      </div>

    </div>
  );
};

export default WithAuthHOC(Admin);