import { Box, Button, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import {fileUploadCss} from '../../Auth/Register'

const ProjectModal = ({isOpen,onClose,id,deleteButtonHandler,addProjectHandler,projectTitle,resources=[]}) => {

const [title,setTitle]=useState('')
const [description,setDescription]=useState('')
const [image,setImage]=useState('')
const [imagePrev,setImagePrev]=useState('')

const changeImageHandler=e=>{
  const file=e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend=()=>{
    setImagePrev(reader.result)
    setImage(file)
  }
}



const handleClose=()=>{
    setTitle('')
    setDescription('')
    setImage('')
    setImagePrev('')
    onClose()
}
  return (
    <Modal isOpen={isOpen} size='full' onClose={handleClose}
    scrollBehavior='inside'
    >
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>{projectTitle}</ModalHeader>

<ModalCloseButton />

        <ModalBody p={'16'}>
            <Grid templateColumns={['1fr','3fr 1fr']} >
<Box px={['0' , '16']}>

<Box my={'5'} >
    <Heading children={projectTitle}/>
    <Heading children={`#${id}`} size='sm' opacity={0.4} />
</Box>

<Heading children={'Resources'} size={'lg'} />
{
  resources.map((item,i)=>(
    <ProjectCard 
key={i}
title={item.title}
description={item.description}
num={i+1}
resourceId={item._id}
projectId={id}
deleteButtonHandler={deleteButtonHandler}
 />
  ))
}
</Box>

<Box> 
    <form
    onSubmit={e=>addProjectHandler(e,id,title,description,image)}
    >
<VStack spacing={'4'}>
    <Heading children='Add Resource' size={'md'} textTransform={'uppercase'} />

    <Input focusBorderColor='purple.300' placeholder='Title' value={title} 
    onChange={e=>setTitle(e.target.value)}
    />


    <Input focusBorderColor='purple.300' placeholder='Description' value={description} 
    onChange={e=>setDescription(e.target.value)}
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
                  <image 
                  src={imagePrev}>

                  </image>
                )}


                <Button w={'full'}  colorScheme={'purple'} type='submit' >Add</Button>
</VStack>
    </form>
</Box>
            </Grid>

        </ModalBody> 
        <ModalFooter>
           
            <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ProjectModal


 function ProjectCard({title,description,num,resourceId,projectId,deleteButtonHandler}){
    return <Stack direction={['column','row']} my={'8'} borderRadius={'lg'}
    boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
    justifyContent={['flex-start','space-between']}
    p={['4','8']}
    >
   <Box>
    <Heading size={'sm'} children={`#${num}${title}`}/>
    <Text children={description}/>
    </Box>
    <Button color={'purple.600'}
    onClick={()=>deleteButtonHandler(projectId,resourceId)}
    >
        <RiDeleteBin7Fill/>
    </Button>

    </Stack>
 }