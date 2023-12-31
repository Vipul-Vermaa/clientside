import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Heading, Image, Input, VStack } from '@chakra-ui/react'
import Sidebar from '../Sidebar'
import { createProject } from '../../../redux/actions/admin'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import {fileUploadCss} from '../../Auth/Register'

const CreateProject = () => {

const [title,setTitle]=useState('')
const [description,setDescription]=useState('')
const [createdBy,setCreatedBy]=useState('')
const [image,setImage]=useState('')
const [imagePrev,setImagePrev]=useState('')

const dispatch=useDispatch()
const {error,message}=useSelector(state=>state.admin)


const changeImageHandler=e=>{
  const file=e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend=()=>{
    setImagePrev(reader.result)
    setImage(file)
  }
}

  const submitHandler=e=>{
    e.preventDefault()

    const myForm=new FormData()

      myForm.append('title',title)
      myForm.append('description',description)
      myForm.append('createdBy',createdBy)
      myForm.append('file',image)

      dispatch(createProject(myForm))
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
    <Grid 
     
    minH={'100vh'} templateColumns={['1fr','5fr 1fr']}    
    >
      <Container py={'16'}>
      <form onSubmit={submitHandler} >
        <Heading textTransform={'uppercase'}
        children='Create Project'
        my={'16'}
        textAlign={['center','left']}
        />

        <VStack m={'auto'} spacing={'8'}>
        <Input
                
                value={title}
                onChange={e=>setTitle(e.target.value)}
                placeholder='Title'
                type={'text'}
                focusBorderColor='purple.300'
                />


        <Input
                
                value={description}
                onChange={e=>setDescription(e.target.value)}
                placeholder='Description'
                type={'text'}
                focusBorderColor='purple.300'
                />

                 
        <Input
                
                value={createdBy}
                onChange={e=>setCreatedBy(e.target.value)}
                placeholder='Creator Name'
                type={'text'}
                focusBorderColor='purple.300'
                />


                <Input accept='image/*'
                required
                type='file'
                focusBorderColor='purple.300'
                css={{
                  '&::file-selector-button':{
                    ...fileUploadCss,
                    color:'purple',
                  }
                }}
                    onChange={changeImageHandler}
                />

                {imagePrev && (
                  <Image src={imagePrev} boxSize='64' objectFit={'contain'}/>
                )}

                <Button w={'full'} colorScheme='purple' type='submit'>Create</Button>
        </VStack>
      </form>

      </Container>

<Sidebar/>

    </Grid>
  )
}

export default CreateProject