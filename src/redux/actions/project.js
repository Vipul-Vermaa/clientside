import {server} from '../store'
import axios from 'axios' 

export const getAllProjects=()=>async dispatch =>{
    try {
        dispatch({
            type:'allProjectsRequest'})
            const {data}=await axios.get(`${server}/projects`,{
                
    },)
        dispatch({
            type:'allProjectsSuccess',payload:data.projects})
    } catch (error) {
        dispatch({
            type:'allProjectsFail',
            payload:error.response.data.message,})
    }
}


export const getProjectResources= id =>async dispatch =>{
    try {
        dispatch({
            type:'getProjectRequest'})
            const {data}=await axios.get(`${server}/project/${id}`,{
              withCredentials:true,  
    },)
        dispatch({
            type:'getProjectSuccess',payload:data.resources})
    } catch (error) {
        dispatch({
            type:'getProjectFail',
            payload:error.response.data.message,})
    }

    
}