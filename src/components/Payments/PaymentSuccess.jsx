import { Box, Button, Container, Heading, Text, VStack, } from '@chakra-ui/react'
import React from 'react'
import {RiCheckboxCircleFill} from 'react-icons/ri'
import { Link,useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const reference=useSearchParams()[0].get('reference')
  return (
    <Container h='90vh' p='16'>
        <Heading my={'8'} textAlign={'center'}>Payment Done</Heading>
        <VStack boxShadow={'lg'} pb='16' alignItems={'center'} borderRadius={'lg'}>
        <Box w={'full'}
        p={'4'}
        bg={'cyan.400'}
        css={{borderRadius:'8px 8px 0 0'}}
        >
            <Text color={'black'}>
                Payment Success
            </Text>
            
        </Box>

        <Box p={'4'}>
            <VStack textAlign={'center'} px={'8'} mt='4' spacing={'8'}>
            <Text>You have accessed premium projects</Text>
        
            <Heading size={'3xl'}>
                <RiCheckboxCircleFill/>
            </Heading>
    
        </VStack>
        </Box>

        <Link to='/profile'>
            <Button>Go to profile</Button>
        </Link>
        <Heading size={'xs'} >Reference:{reference}</Heading>
        </VStack>

    </Container>
  )
}

export default PaymentSuccess