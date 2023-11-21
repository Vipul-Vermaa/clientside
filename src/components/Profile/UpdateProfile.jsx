import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../redux/actions/profile'
import { loadUser } from '../../redux/actions/user'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
     const [name,setName]=useState('')
     const [email,setEmail]=useState('')

     const navigate=useNavigate()
     const dispatch=useDispatch()
     const submitHandler=async e =>{
      e.preventDefault()
      

      await dispatch(updateProfile(name,email))
      dispatch(loadUser())
      navigate('/profile')
    }
  return (
    <Container py='16' minH={'90vh'}>
      <form onSubmit={submitHandler} >
        <Heading children='Update Profile'
        my={'16'}
        textAlign={['center','left']}
        />
        <VStack spacing={'8'}>
        <Input
                
                value={name}
                onChange={e=>setName(e.target.value)}
                placeholder='Name'
                type={'text'}
                />


        <Input
                
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder='Email'
                type={'email'}
                />

                <Button w='full' colorScheme='cyan' type='submit'>Change</Button>
        </VStack>
      </form>

    </Container>
  )
}

export default UpdateProfile