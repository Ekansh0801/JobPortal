import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"Job",
    initialState:{
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        searchJobByText:null,
        allAppliedJobs:[],
        searchedQuery:null,
    },
    reducers:{
        setAllJobs:(state,action) => {
            state.allJobs = action.payload
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setsearchJobByText:(state,action) =>{
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
})

export const {setAllJobs,setSingleJob,setAllAdminJobs,setsearchJobByText,setAllAppliedJobs,setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;