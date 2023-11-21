import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changepassword } from '../../redux/actions/profile'
import toast from 'react-hot-toast'

const ChangePassword = () => {

    const [oldPassword,setOldPassword]=useState('')
    const [newPassword,setNewPassword]=useState('')

    const dispatch=useDispatch()
     const submitHandler=(e)=>{
      e.preventDefault()
      

      dispatch(changepassword(oldPassword,newPassword))
    }

    const {message,error}=useSelector(state=>state.profile)

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
    <Container py='16' minH={'90vh'}>
      <form onSubmit={submitHandler} >
        <Heading children='Change Password'
        my={'16'}
        textAlign={['center','left']}
        />
        <VStack spacing={'8'}>
        <Input
                required
                // id='password'
                value={oldPassword}
                onChange={e=>setOldPassword(e.target.value)}
                placeholder='Enter old Password'
                type={'password'}
                />


        <Input
                required
                // id='password'
                value={newPassword}
                onChange={e=>setNewPassword(e.target.value)}
                placeholder='Enter new Password'
                type={'password'}
                />

                <Button w='full' colorScheme='cyan' type='submit'>Change</Button>
        </VStack>
      </form>

    </Container>
  )
}

export default ChangePassword