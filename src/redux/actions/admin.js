import {server} from '../store'
import axios from 'axios'


export const createProject= formData =>async dispatch =>{
    try {

        const config={
            headers:{
                'Content-Type':'multipart/form-data',
            },
            withCredentials:true,
        }
        dispatch({
            type:'createProjectRequest'})
            const {data}=await axios.post(`${server}/createproject`,formData,config)
        dispatch({
            type:'createProjectSuccess',payload:data.message})
    } catch (error) {
        dispatch({
            type:'createProjectFail',
            payload:error.response.data.message,})
    }

}



export const deleteProject= id =>async dispatch =>{
    try {

        const config={
            
            withCredentials:true,
        }
        dispatch({
            type:'deleteProjectRequest'})
            const {data}=await axios.delete(`${server}/project/${id}`,config)
        dispatch({
            type:'deleteProjectSuccess',payload:data.message})
    } catch (error) {
        dispatch({
            type:'deleteProjectFail',
            payload:error.response.data.message,})
    }
}



export const getAllUsers= () =>async dispatch =>{
    try {

        const config={
            
            withCredentials:true,
        }
        dispatch({
            type:'getAllUsersRequest'})
            const {data}=await axios.get(
                `${server}/admin/users`,config)
        dispatch({
            type:'getAllUsersSuccess',payload:data.users})
    } catch (error) {
        dispatch({
            type:'getAllUsersFail',
            payload:error.response.data.message,})
    }

}





export const updateUserRole= id =>async dispatch =>{
    try {

        const config={
            
            withCredentials:true,
        }
        dispatch({
            type:'updateUserRoleRequest'})
            const {data}=await axios.put(
                `${server}/admin/user/${id}`,{},config)
        dispatch({
            type:'updateUserRoleSuccess',payload:data.message})
    } catch (error) {
        dispatch({
            type:'updateUserRoleFail',
            payload:error.response.data.message,})
    }

}



export const deleteUser= id =>async dispatch =>{
    try {

        const config={
            
            withCredentials:true,
        }
        dispatch({
            type:'deleteUserRequest'})
            const {data}=await axios.delete(
                `${server}/admin/user/${id}`,config)
        dispatch({
            type:'deleteUserSuccess',payload:data.message})
    } catch (error) {
        dispatch({
            type:'deleteUserFail',
            payload:error.response.data.message,})
    }

}




export const getDashboardStats= () =>async dispatch =>{
    try {

        const config={
            
            withCredentials:true,
        }
        dispatch({
            type:'getAdminStatsRequest'})
            const {data}=await axios.get(
                `${server}/admin/stats`,config)
        dispatch({
            type:'getAdminStatsSuccess',payload:data})
    } catch (error) {
        dispatch({
            type:'getAdminStatsFail',
            payload:error.response.data.message,})
    }

}



export const addResource= (id,formdata) =>async dispatch =>{
    try {

        const config={
            headers:{
                'Content-Type':'multipart/form-data',
            },
            withCredentials:true,
        }
        dispatch({
            type:'addResourceRequest'})
            const {data}=await axios.post(`${server}/project/${id}`,formdata,config)
        dispatch({
            type:'addResourceSuccess',payload:data.message})
    } catch (error) {
        dispatch({
            type:'addResourceFail',
            payload:error.response.data.message,})
    }

}



export const deleteResource= (projectId,resourceId) =>async dispatch =>{
    try {

        const config={
            
            withCredentials:true,
        }
        dispatch({
            type:'deleteResourceRequest'})
            const {data}=await axios.delete(
                `${server}/resource?projectId=${projectId}&resourceId=${resourceId}`,config)
        dispatch({
            type:'deleteResourceSuccess',payload:data.message})
    } catch (error) {
        dispatch({
            type:'deleteResourceFail',
            payload:error.response.data.message,})
    }

}