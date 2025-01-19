import axios from 'axios';
import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAllCompanies } from '@/redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanies = async() => {
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllCompanies(res.data.companies))
                    // toast.success(res.data.message);
                }
            }
            catch(error){
                toast.error(error);
            }
        }

        fetchAllCompanies();
    },[]);
}

export default useGetAllCompanies