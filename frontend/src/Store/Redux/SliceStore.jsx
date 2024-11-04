import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    searchJobByText: "",
    allAppliedJobs:[],
    searchQuery:""
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs:(state,action)=>{
      state.allAppliedJobs=action.payload
    },
    setSearchQuery:(state,action)=>{
      state.searchQuery=action.payload
    }
  },
});
export const { setAllJobs, setSearchJobByText,setAllAppliedJobs,setSearchQuery} =jobSlice.actions;

export const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});
export const { setSingleCompany, setCompanies, setSearchCompanyByText } =companySlice.actions;

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants:[],
  },
  reducers: {
    setAllApplicants:(state,action) => {
      state.applicants = action.payload;
    },
  },
});
export const {setAllApplicants} = applicationSlice.actions;
