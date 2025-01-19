import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"Company",
    initialState:{
        singleCompany:null,
        allCompanies:[],
        searchCompanybyText:"",
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany = action.payload
        },
        setAllCompanies:(state,action) => {
            state.allCompanies = action.payload
        },
        setSearchCompanyByText:(state,action) => {
            state.searchCompanybyText = action.payload
        }
    }
})

export const {setSingleCompany,setAllCompanies,setSearchCompanyByText} = companySlice.actions;
export default companySlice.reducer;