import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { buySubscription } from '../../redux/actions/user'
import toast from 'react-hot-toast'
import {server} from '../../redux/store'


const Subscribe = ({user}) => {

  const dispatch=useDispatch()
  const [key,setKey]=useState("")

  const {error,subscriptionId}=useSelector(state=>state.subscription)
  const {error:projectError}=useSelector(state=>state.project)


   const subscribeHandler=async ()=>{
   const {data}= await axios.get(`${server}/razorpaykey`) 
   setKey(data.key)
   dispatch(buySubscription())
  }
  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(projectError){
      toast.error(projectError)
      dispatch({type:'clearError'})
    }


    if(subscriptionId){
      const openPopUp=()=>{
        const options={
          key,
          name:"ProjectPlace",
          description:"Get access to your desired project",
          // image:logo,
          subscription_id:subscriptionId,
          callback_url:`${server}/paymentverification`,
          prefill:{
            name:user.name,
            email:user.email,
            contact:""

          },
          // notes:{
          //   address:"asdfg"
          // },
          theme:{
            color:"FFC800"
          }
        }
        const razor=new window.Razorpay(options)
        razor.open()
      }
      openPopUp()
    }
    
  }, [dispatch,error,projectError,user.name,user.email,key,subscriptionId])
  

  return (
    <Container h='90vh' p={'16'} >
        <Heading children='Welcome' my={'8'} textAlign={'center'} />
        <VStack  
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={'0'}
        >

            <Box bg={'cyan.400'} p={'4'} css={{borderRadius:'8px 8px 0 0'}} >
                <Text color={'black'} children={'Just at - ₹99.00'} />
            </Box>
            <Box p='4' >
            <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'} >
                <Text color={'black'} children='Join Today and Get Access to all content' />
                <Heading size={'md'} children={'₹99 Only'} />
            </VStack>
            <Button my={'8'} w='full' colorScheme={'cyan'} onClick={subscribeHandler} >Buy Now</Button>
            </Box>
            
        </VStack>
    </Container>
  )
}

export default Subscribe