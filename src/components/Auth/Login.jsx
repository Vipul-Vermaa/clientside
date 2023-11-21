import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { login } from '../../redux/actions/user'

const Login = () => {

    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const dispatch=useDispatch()

    const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(login(email,password))
    }
  return (
    <Container h={'95vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
            <Heading children='Welcome!!'/>
            <form onSubmit={submitHandler} style={{width:'100%'}}>
              <Box my={'4'}>
              <Input
                required
                id='email'
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder='Enter Email'
                type={'email'}
                />
              </Box>


              <Box my={'4'}>
              <Input
                required
                id='password'
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder='Enter Password'
                type={'password'}
                />
              </Box>

               <Box>
                <Link to='/forgetpassword'>
                    <Button fontSize={'sm'} variant='link'>
                        Forget Password
                    </Button>
                </Link>
               </Box>

               <Button my='4' color={'black'} type='submit'>
                LOGIN
               </Button>

               <Box my='4'>
                New User? <Link to='/register'><Button colorScheme={'cyan'} variant='link'>Sign UP</Button></Link>
               </Box>
            </form>
        </VStack>
    </Container>
  )
}

export default Login