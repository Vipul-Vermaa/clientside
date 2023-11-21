import {configureStore} from '@reduxjs/toolkit'
import {profileReducer, subscriptionReducer, userReducer} from './reducers/userReducer'
import {projectReducer} from './reducers/projectReducer'
import { adminReducer } from './reducers/adminReducer';


const store=configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        project:projectReducer,
        subscription:subscriptionReducer,
        admin:adminReducer,
    },
})

export default store;

export const server='https://in-resources.onrender.com/api/v1'
