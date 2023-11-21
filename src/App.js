import React, { useEffect } from 'react';
import {
  BrowserRouter as 
  Router,
  Routes,
  Route } 
  from 'react-router-dom'
import Home from './components/Home';
import Projects from './components/Projects';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import ChangePassword from './components/Profile/ChangePassword';

import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';

import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';

import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateProject from './components/Admin/CreateProject/CreateProject';
import Project from './components/Admin/Project/Project';
import Users from './components/Admin/Users/Users';
import ProjectPage from './components/ProjectPage/ProjectPage';
import Subscribe from './components/Payments/Subscribe';

import { useDispatch, useSelector } from 'react-redux';
import { toast,Toaster} from 'react-hot-toast'
import { loadUser } from './redux/actions/user';
import {ProtectedRoute} from 'protected-route-react'


function App() {

  const {isAuthenticated,user,message,error}=useSelector(state=>state.user)
  const dispatch=useDispatch()

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
    }
  },[dispatch,error,message])

  useEffect(() => {
    dispatch(loadUser())
  },[dispatch])
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>        
        <Route path='/projects' element={<Projects/>}/>        
        <Route path='/project/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated}><ProjectPage user={user}/></ProtectedRoute>}/>        

        <Route path='/login' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'><Login/></ProtectedRoute>}/>        
        <Route path='/register' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'><Register/></ProtectedRoute>}/>        

        <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile user={user} /></ProtectedRoute>}/>        
        <Route path='/updateprofile' element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdateProfile user={user} /></ProtectedRoute>}/>        
        
        <Route path='/changepassword' element={<ProtectedRoute isAuthenticated={isAuthenticated}><ChangePassword/></ProtectedRoute>}/>        
        <Route path='/forgetpassword' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'><ForgetPassword/></ProtectedRoute>}/>        

        <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>        
        <Route path='/paymentfail' element={<PaymentFail/>}/>        
        <Route path='/subscribe' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Subscribe user={user}/></ProtectedRoute>}/>        

        <Route path='/resetpassword/:token' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'><ResetPassword/></ProtectedRoute>}/>        

        <Route path='/admin/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}><Dashboard/></ProtectedRoute>}/>        
        <Route path='/admin/createproject' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}><CreateProject/></ProtectedRoute>}/>        
        <Route path='/admin/project' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}><Project/></ProtectedRoute>}/>        
        <Route path='/admin/users' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}><Users/></ProtectedRoute>}/>        
      </Routes>
      <Toaster/>
    </Router>       
  );
}
export default App;
