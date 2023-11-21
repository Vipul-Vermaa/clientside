import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetpassword } from '../../redux/actions/profile'

const ResetPassword = () => {
    const[password,setPassword]=useState("")

    const params=useParams()
    const navigate=useNavigate()

    const {message,error}=useSelector(state=>state.profile)
    const dispatch=useDispatch()
    const submitHandler=e=>{
      e.preventDefault()
      dispatch(resetpassword(params.token,password))
    }
    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:'clearError'})
      }
      if(message){
        toast.success(message)
        dispatch({type:'clearMessage'})
        navigate('/login')
      }
      
      
    }, [dispatch,error,message])
    // params to get/access the token
  return (
    <Container py={'16'} h={'90vh'}>
        <form onSubmit={submitHandler} >
            <Heading children="Reset PassWord"
            my="16"
            textTransform={'uppercase'}
            textAlign={['center','left']}
            />
            <VStack spacing={'8'}>
            <Input
                required
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder='New Password'
                type={'password'}
                />

                <Button type='submit' w={"full"} colorScheme='cyan'>
                 Reset Password
                </Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ResetPassword