import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    const navigate = useNavigate();
    useGetAllCompanies();
    const {allCompanies} = useSelector(store => store.company);
    const [input,setInput] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setSearchCompanyByText(input));
    },[input]);
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
            <Input className="w-fit " onChange={(e) => (setInput(e.target.value))}  placeholder="filter by name"/>
            <Button className="" onClick={() => (navigate('/admin/companies/create'))}>New Company</Button>
            </div>

            <CompaniesTable/>
        </div>
    </div>
  )
}

export default Companies