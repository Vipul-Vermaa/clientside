import { Button, Container, Heading, Input, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../redux/actions/profile'
import toast from 'react-hot-toast'

const ForgetPassword = () => {
    const[email,setEmail]=useState("")

    const {message,error}=useSelector(state=>state.profile)

    const dispatch=useDispatch()
    const submitHandler=e=>{
      e.preventDefault()
      dispatch(forgetPassword(email))
    }
    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:'clearError'})
      }
      if(message){
        toast.success(message)
        dispatch({type:'clearMessage'})
      }
      
      
    }, [dispatch,error,message])
    
  return (
    <Container py={'16'} h={'90vh'}>
        <form onSubmit={submitHandler} >
            <Heading children="Forget PassWord"
            my="16"
            textTransform={'uppercase'}
            textAlign={['center','left']}
            />
            <VStack spacing={'8'}>
            <Input
                required
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder='Enter Email'
                type={'email'}
                />

                <Button type='submit' w={"full"} colorScheme='cyan'>
                 Send Reset Link
                </Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ForgetPassword