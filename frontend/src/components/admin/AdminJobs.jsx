import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setsearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
    const navigate = useNavigate();
    useGetAllAdminJobs();
    const {allAdminJobs} = useSelector(store => store.job);
    const [input,setInput] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setsearchJobByText(input));
    },[input]);
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
            <Input className="w-fit " onChange={(e) => (setInput(e.target.value))}  placeholder="filter by company, role"/>
            <Button className="" onClick={() => (navigate('/admin/jobs/create'))}>New Jobs</Button>
            </div>

            <AdminJobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs