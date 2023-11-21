import { Button, Container, HStack, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../redux/actions/project'
import toast from 'react-hot-toast'
import { addToPlaylist } from '../redux/actions/profile'
import { loadUser } from '../redux/actions/user'

const Project=({views,title,imageSrc,addToPlaylistHandler,id,creator,description})=>{

    return(
      <VStack className='project' alignItems={['center','flex-start']}>
          <Image src={imageSrc} 
          boxSize='60' 
          objectFit={'contain'}
          />
          <Heading  
          textAlign={['center','left']}
          size={'sm'}
          maxW='200px'
          children={title}
          />
          <Text  
          noOfLines={2}
          
          textAlign={['center','left']}
          size={'sm'}
          maxW='200px'
          children={description}
          />
          <HStack>
            <Text fontWeight={'bold'} textTransform="uppercase" children={'creator'}/>
            <Text fontFamily={'body'} textTransform="uppercase" children={creator}/>

          </HStack>


        <Heading size={'xs'} children={`Views-${views}`} 
        textTransform={'uppercase'}
        />

          <Stack direction={['column','row']} alignItems='center'>
            <Link to={`/project/${id}`}>
                <Button>
                    View
                </Button>
            </Link>
            <Button variant={'ghost'} colorScheme='cyan'
            onClick={()=>addToPlaylistHandler(id)}
            >Add to playlist</Button>

          </Stack>
      </VStack>
    )

}

const Projects = () => {  
  const dispatch=useDispatch()

  const addToPlaylistHandler=async projectId =>{
    await dispatch(addToPlaylist(projectId))
    dispatch(loadUser())
}

const{projects,error,message}=useSelector(state=>state.project)
useEffect(() => {
  dispatch(getAllProjects())
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
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
        <Heading children="All Projects"/>

        <Stack direction={['column','row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start','space-evenly']}
        alignItems={['center','flex-start']}
        >
        {
          projects && projects.map((item)=>(
            <Project key={item._id}
        title={item.title}
        description={item.description}
        views={item.views}
        imageSrc={item.poster.url}
        id={item._id}
        creator={item.createdBy}
        addToPlaylistHandler={addToPlaylistHandler}
        />
          ))
        }
        </Stack>
    </Container>
  )
}

export default Projects
