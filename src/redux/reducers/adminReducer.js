import {createReducer} from '@reduxjs/toolkit'


export const adminReducer=createReducer({},{    

    createProjectRequest:state=>{
        state.loading=true;
    },
    createProjectSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    createProjectFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },





    deleteProjectRequest:state=>{
        state.loading=true;
    },
    deleteProjectSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    deleteProjectFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },




    getAllUsersRequest:state=>{
        state.loading=true;
    },
    getAllUsersSuccess:(state,action)=>{
        state.loading=false;
        state.users=action.payload;
    },
    getAllUsersFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },



    updateUserRoleRequest:state=>{
        state.loading=true;
    },
    updateUserRoleSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    updateUserRoleFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },    





    deleteUserRequest:state=>{
        state.loading=true;
    },
    deleteUserSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    deleteUserFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },



    getAdminStatsRequest:state=>{
        state.loading=true;
    },
    getAdminStatsSuccess:(state,action)=>{
        state.loading=false;
        state.stats=action.payload.stats;

        state.viewsCount=action.payload.viewsCount;
        state.subscriptionCount=action.payload.subscriptionCount;
        state.usersCount=action.payload.usersCount;

        state.subscriptionPercentage=action.payload.subscriptionPercentage;
        state.viewsPercentage=action.payload.viewsPercentage;
        state.usersPercentage=action.payload.usersPercentage;

        state.subscriptionProfit=action.payload.subscriptionProfit;
        state.viewsProfit=action.payload.viewsProfit;
        state.usersProfit=action.payload.usersProfit;
    },
    getAdminStatsFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },



    addResourceRequest:state=>{
        state.loading=true;
    },
    addResourceSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    addResourceFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },




    deleteResourceRequest:state=>{
        state.loading=true;
    },
    deleteResourceSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    deleteResourceFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },




    clearError:(state)=>{
    state.error=null;
    },
    clearMessage:(state)=>{
    state.message=null;
    },


})