import React, { useState, useEffect, useContext } from 'react';
import styles from './History.module.css';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import { AuthContext } from '../../utils/AuthContext';
import axios from '../../utils/axios'

const History = () => {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {

    const fetchUserData = async()=>{
      setLoader(true)
    try{
      const results = await axios.get(`/api/resume/get/${userInfo?._id}`);
      console.log(results.data.resumes)
      setData(results.data.resumes)
    }catch(err){
      console. log(err)
      alert("Something Went Wrong")
    }finally{
      setLoader(false);
    }
  }

    fetchUserData();

  },[]);

  return (
    <div className={styles.History}>

      <div className={styles.header}>
        <h1>Analysis History</h1>
        <p>Your previous resume evaluations</p>
      </div>

      <div className={styles.cardBlock}>

        {loader && (
          <>
          <Skeleton variant="rectangular" width={260} height={180} />
          <Skeleton variant="rectangular" width={260} height={180} />
          <Skeleton variant="rectangular" width={260} height={180} />
          </>
        )}

        {!loader && data.length > 0 && data.map((item,index) => (
          <div key={item._id} className={styles.card}>

            <div className={styles.score}>
              {item.score}%
            </div>

            <h3>{item.resume_name}</h3>
            <p>{item.feedback}</p>

            {/* <span>{item.createdAt}</span> */}
            <span>
            {new Date(item.createdAt).toLocaleDateString()}
            </span>

          </div>
        ))}

        {!loader && data.length === 0 && (
        <div className={styles.empty}>
          <h2>No History Found</h2>
          <p>Your analyzed resumes will appear here.</p>
        </div>
        )}

      </div>

    </div>
  );
};

export default WithAuthHOC(History);