import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../../redux/actions/user'


export const fileUploadCss={
       cursor:"pointer",
      marginLeft:"-3.5%",
      width:"110%",
      border:"none",
      height:"100%",
      backgroundColor:'white'
}

const fileUploadStyle={
    "&::file-selector-button":fileUploadCss,
}

const Register = () => {

    const[email,setEmail]=useState("")
    const[name,setName]=useState("")
    const[password,setPassword]=useState("")
    const[imagePrev,setImagePrev]=useState('')
    const[image,setImage]=useState('')


    const dispatch=useDispatch()

    const changeImageHandler =(e)=>{
      const file=e.target.files[0];
      const reader=new FileReader()
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setImagePrev(reader.result)
        setImage(file)
      }
    }

    const submitHandler=(e)=>{
      e.preventDefault()
      const myForm=new FormData()

      myForm.append('name',name)
      myForm.append('email',email)
      myForm.append('password',password)
      myForm.append('file',image)

      dispatch(register(myForm))
    }
  return (
    <Container h={'100vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
            <Heading children='Register Here To Continue!!'/>
            <form onSubmit={submitHandler} style={{width:'100%'}}>

              <Box my={'4'} display={'flex'} justifyContent={'center'}>
                <Avatar src={imagePrev} size={'2xl'} />
              </Box>
             
              <Box my={'3'}>
                <FormLabel htmlFor='name' children='Name'/>
              <Input
                required
                id='name'
                value={name}
                onChange={e=>setName(e.target.value)}
                placeholder='Enter Name'
                type={'text'}
                />
              </Box>


              <Box my={'3'}>
              <FormLabel htmlFor='email' children='Email'/>
              <Input
                required
                id='email'
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder='Enter Email'
                type={'email'}
                />
              </Box>


              <Box my={'3'}>
              <FormLabel htmlFor='password' children='Password'/>
              <Input
                required
                id='password'
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder='Enter Password'
                type={'password'}
                />
              </Box>


              <Box my={'3'}>
              <FormLabel htmlFor='chooseAvatar' children='Choose Avatar'/>
              <Input
                accept='image/*'
                id='chooseAvatar'
                type={'file'}
                css={fileUploadStyle}
                onChange={changeImageHandler}
                
                />
              </Box>


               

               <Button my='3' color={'black'} type='submit'>
                Sign Up
               </Button>

               <Box my='3'>
                Already SignUP? <Link to='/login'><Button colorScheme={'cyan'} variant='link'>Login</Button></Link>
               </Box>
            </form>
        </VStack>
    </Container>
  )
}
export default Register