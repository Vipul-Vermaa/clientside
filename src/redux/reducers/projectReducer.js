import {createReducer} from '@reduxjs/toolkit'




export const projectReducer=createReducer({projects:[],resources:[]},{
    allProjectsRequest:(state)=>{
    state.loading=true
    },
    allProjectsSuccess:(state,action)=>{
        state.loading=false
        state.projects=action.payload
    },
    allProjectsFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    
    
    getProjectsRequest:(state)=>{
        state.loading=true
        },
        getProjectsSuccess:(state,action)=>{
            state.loading=false
            state.resources=action.payload
        },
        getProjectsFail:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
    
    
    
    addToPlaylistRequest:(state)=>{
    state.loading=true
    },
    addToPlaylistSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    addToPlaylistFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    
    clearError:(state)=>{
        state.error=null;
          },
          clearMessage:(state)=>{
        state.message=null;
          },
    
    })