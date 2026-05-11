import React, { useState, useContext } from "react";
import styles from "./Dashboard.module.css";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import { AuthContext } from '../../utils/AuthContext';
import axios from '../../utils/axios'

const Dashboard = () => {

    const [fileName, setFileName] = useState("Upload resume");
    const [loading, setLoading] = useState(false);
    const [jobDesc, setJobDesc] = useState("");
    const [result, setResult] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);

    const { userInfo } = useContext(AuthContext);

    const handleFile = (e) => {
        const file = e.target.files[0];
        setFileName(file?.name || "Upload resume");
        setResumeFile(file);
    };

    // setLoading(true);

    //     setTimeout(() => {
    //         setResult({
    //             score: "85%",
    //             message: "Good Match",
    //         });
    //         setLoading(false);
    //     }, 1200);

    const handleAnalyze = async () => {
        setResult(null)
        if (!jobDesc || !resumeFile) {
            alert("Please fill Job Description & Upload Resume");
            return;
        }

        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("job_desc", jobDesc);
        formData.append("user",userInfo._id);

        setLoading(true);
        try{
            const result =await axios.post('/api/resume/addResume', formData);
            console.log(result)
            // setResult(result.data.data);
            setResult({
                score: result.data.data.score,
                message: result.data.data.feedback,
            });
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className={styles.Dashboard}>

            {/* LEFT */}
            <div className={styles.Left}>

                <div className={styles.header}>
                    <h1 >Smart Resume Screening</h1>
                    <p>Upload resume and compare with job description using AI</p>
                </div>

                <div className={styles.card}>
                    <input type="file" onChange={handleFile} />
                    {/* <span className={styles.file}>{fileName}</span> */}
                </div>

                <div className={styles.card}>
                    <textarea
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        placeholder="Paste job description..."
                        className={styles.textarea}
                    />

                    <button onClick={handleAnalyze} className={styles.btn}>
                        <CreditScoreIcon />
                        Analyze
                    </button>
                </div>

            </div>

            {/* RIGHT */}
            <div className={styles.Right}>

                <div className={styles.profile}>
                   <img
                        src={
                            userInfo?.photoUrl?.trim()
                            ? userInfo.photoUrl
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                    alt="Profile"
                    className={styles.profileImage}
                    />
                    <h3>{userInfo?.name || "User"}</h3>
                    <p>AI Resume Analyzer</p>
                </div>

                {loading && (
                    // <Skeleton variant="rectangular" width={280} height={280} />
                    <Skeleton
                        variant="rounded"
                        width={350}
                        height={500}
                        sx={{ borderRadius: "20px" }}
/>
                    )}

                {/* {result && !loading && (
                    <div className={styles.result}>
                        <h2>{result.score}</h2>
                        <p>{result.message}</p>
                    </div>
                )} */}

                {/* {
                    result && <div className={styles.DashboardRightTopCard}>
                    <div>Result</div>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
                    <h1 style={{color : "black"}}>{result ?. score}% </h1>
                    <CreditScoreIcon sx={{ fontSize: 22 }} />
                    </div>

                    <div className={styles.feedback}>
                    <h3>Feedback</h3>
                    <p style={{fontSize:15}}>{result ?. message} </p>
                    </div>
                    </div>
                } */}

                {
                result && (
                    <div className={styles.DashboardRightTopCard}>

                        <div style={{ textAlign: "center" }}>
                            <h2 style={{color:"black"}}>Result</h2>
                        </div>

                        <div className={styles.scoreSection}>
                            <h1>{result?.score}%</h1>
                            <CreditScoreIcon sx={{ fontSize: 32, color: "#2563eb" }} />
                        </div>

                        <div className={styles.feedback}>
                            <h3>Feedback</h3>
                            <p>{result?.message}</p>
                        </div>

                    </div>
                    )
                }

                {!result && !loading && (
                <div className={styles.empty}>
                    <p>Run analysis to see result</p>
                </div>
                )}

            </div>

        </div>
    );
};

export default WithAuthHOC(Dashboard);