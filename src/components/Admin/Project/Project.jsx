import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import ProjectModal from './ProjectModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects, getProjectResources } from '../../../redux/actions/project'
import { addResource, deleteProject } from '../../../redux/actions/admin'
import toast from 'react-hot-toast'

const Project = () => {

  const {projects,resources}=useSelector(state=>state.project)
  const {error,message}=useSelector(state=>state.admin)
  const dispatch=useDispatch()

  const {isOpen,onClose,onOpen}=useDisclosure()

  const[projectId,setProjectId]=useState('')
  const[projectTitle,setProjectTitle]=useState('')


   const projectDetailsHandler=(projectId,title)=>{
    dispatch(getProjectResources(projectId))
    onOpen()
    setProjectId(projectId)
    setProjectTitle(title)
   }
   const deleteButtonHandler=projectId=>{
    dispatch(deleteProject(projectId))
   }

   const deleteProjectButtonHandler=async(projectId,resourceId)=>{
   await dispatch(deleteProject(projectId,resourceId))
   dispatch(getProjectResources(projectId))
   }

   const addResourceHandler=async(e,projectId,title,description,image)=>{
  
    
    e.preventDefault()
    const myForm=new FormData()

    myForm.append('title',title)
    myForm.append('description',description)
   
    myForm.append('file',image)

    await dispatch(addResource(projectId,myForm))
    dispatch(getProjectResources(projectId))
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

     dispatch(getAllProjects())
   }, [dispatch,error,message])
   


  return (
    <Grid 
     
    minH={'100vh'} templateColumns={['1fr','5fr 1fr']}
    
    >
<Box p={['0','8']} overflow={'auto'}>
<Heading 
  textTransform={'uppercase'}
 children='All Projects'
 my={'16'}
 textAlign={['center','left']}
 />

<TableContainer w={['100vw','full']}>
<Table variant={'simple'} size='lg'>
<TableCaption>Available Projects</TableCaption>

<Thead>
  <Tr>
    <Th>Id</Th>
    <Th>Poster</Th>
    <Th>Title</Th>
    <Th>Creator</Th>
    <Th isNumeric>Views</Th>
    <Th isNumeric>numOfProject</Th>
  </Tr>
</Thead>

<Tbody>
  {
    projects.map(item=>(
      <Row 
      projectDetailsHandler={projectDetailsHandler}
      deleteButtonHandler={deleteButtonHandler}
      key={item._id} item={item} />
    )
  )}
</Tbody>

</Table>
</TableContainer>


<ProjectModal 
isOpen={isOpen} 
onClose={onClose} 
id={projectId}
projectTitle={projectTitle}
deleteButtonHandler={deleteProjectButtonHandler} 
addResourceHandler={addResourceHandler}
resources={resources}
/>


</Box>
<Sidebar/>

    </Grid>
  
  )
}



function Row({item,projectDetailsHandler,deleteButtonHandler}){
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
       <Image src={item.poster.url}/>
        </Td>
      <Td>{item.title}</Td>
      <Td>{item.createdBy}</Td>
      
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfdocFile}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
         <Button onClick={()=>projectDetailsHandler(item._id,item.title)} variant={'outline'} color={'purple.500'}>View Resource</Button>
         <Button onClick={()=>deleteButtonHandler(item._id)} color={'purple.600'}>
          <RiDeleteBin7Fill/>
         </Button>
        </HStack>
      </Td>
    </Tr>
  )
}

export default Project