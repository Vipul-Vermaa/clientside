import { Box, Button, Grid, Heading, Input, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate, useParams} from 'react-router-dom'
import {getProjectResources} from '../../redux/actions/project'

const ProjectPage = ({user}) => {
    
    const [resourceNumber,setResourceNumber]=useState(0)

    const {resources}=useSelector(state=>state.project)

    

const dispatch=useDispatch()
const params=useParams()
    useEffect(() => {
      dispatch(getProjectResources(params.id))
    }, [dispatch,params.id])


    if(user.role!=='admin' && (user.subscription===undefined || user.subscription.status!=='active')){
      return <Navigate to={'/subscribe'}/>
    }
    
  return (
    <Grid minH={'90vh'} templateColumns={['1fr','3fr 1fr']} >
      {resources && resources.length>0?(
        <>
        <Box>
      <image width={'70%'} 
      src={resources[resourceNumber].image.url}
      >
      </image>
      <Heading m={'4'} children={`#${resourceNumber + 1} ${resources[resourceNumber].title}`} />
      
      <Heading m='4' children='Description' />
      <Text m='4' children={resources[resourceNumber].description} />
      
   </Box>
   <VStack>
     
    {resources.map((element, index) => (
    
      <button onClick={()=>setResourceNumber(index)}
      key={element._id}
      style={{
        width: '100%',
        padding: '1rem',
        textAlign: 'center',
        margin: 0,
        borderBottom: '1px solid rgba(0,0,0,0.2)',
      }}>
      <Text noOfLines={1}>
                  #{index + 1} {element.title}
                </Text>
      </button>
      ))}
   </VStack>
        </>
      ):(
        <Heading children="No Lectures" />
      )}
     
    
    </Grid>
  )
}

export default ProjectPage