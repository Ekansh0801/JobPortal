import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const useGetSingleJob = (id) => {
    const [jobDetails,setJobDetails] = useState({});
    const dispatch = useDispatch();
    // console.log("fetched id is ",id)
    useEffect(() => {
        const fetchJobDetails = async() =>{
            try{
                const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`,{withCredentials:true});
                if(res.data.success){
                    console.log(res.data.job);
                    setJobDetails(res.data.job);
                    dispatch(setSingleJob(jobDetails));
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchJobDetails();
    },[])
}

export default useGetSingleJob