import React from 'react'
import {Box, Button, HStack, Heading, Stack, Text, VStack} from '@chakra-ui/react'
import './home.css'
import { Link } from 'react-router-dom'
import {CgGoogle,CgYoutube,CgTwitter,CgFacebook} from "react-icons/cg"
import Login from '../components/Auth/Login'


const Home = () => {
  return <section className='home'>
    <div className="container">
    <Stack direction={['column','row']}
     height='100%'
     justifyContent={['center','space-between']}
     alignItems='center'
     spacing={['16','56']}
     >
        <VStack width={'full'} alignItems={['center','flex-end']}>
            <Heading children='BUY OR SELL PROJECTS' size={'2xl'}/>
            <Text children='Find valuable projects at reasonable price'/>
         <Link to='/projects'>
            <Button colorScheme='cyan'>
                Explore Now
            </Button>
         </Link>
        </VStack>
     </Stack>
    </div>
    <Login/>
    <Box padding={'8'} bg='blackAlpha.800'>
        <Heading  
        textAlign={'center'}
        fontFamily='body'
        color='cyan.900'
        children="OUR SERVICES"
        />

        
        <HStack className='banner' justifyContent={'space-evenly'} marginTop='4' color={'white'} fontSize={'35'} >
           <a href='https://google.com' target='_blank' > <CgGoogle/></a>
           <a href='https://youtube.com' target='_blank' > <CgYoutube/></a>
           <a href='https://twitter.com' target='_blank' > <CgTwitter/></a>
           <a href='https://facebook.com' target='_blank' > <CgFacebook/></a>
            
        </HStack>

    </Box>

    
  </section>
  
}

export default Home