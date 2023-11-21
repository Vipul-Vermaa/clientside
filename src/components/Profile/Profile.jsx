import { Avatar, Button, Container, HStack, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fileUploadCss } from '../Auth/Register'
import { updateProfilePicture } from '../../redux/actions/profile'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../../redux/actions/user'
import toast from 'react-hot-toast'

const Profile = ({user}) => {


    const dispatch=useDispatch()
    const {message,error}=useSelector(state=>state.profile)

    const changeImageSubmitHandler=async (e,image)=>{

e.preventDefault()
const myForm=new FormData()


myForm.append('file',image)

await dispatch(updateProfilePicture(myForm))
dispatch(loadUser())
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

    const {isOpen,onClose,onOpen} =useDisclosure()

  return (
    <Container minH={'95vh'} maxW='container.lg' py={'8'}>

        <Heading children='Profile' m={'8'} textTransform={'uppercase'}/>
        <Stack 
        justifyContent={'flex-start'}
        direction={['column','row']}
        alignItems={'center'}
        spacing={['8','16']}
        padding='8'
        >

        <VStack>
            <Avatar boxSize={'28'} src={user.avatar.url} />
            <Button onClick={onOpen} colorScheme='cyan' variant={'ghost'}>Change Photo</Button>
        </VStack>
       

       <VStack spacing={'4'} alignItems={['center','flex-start']}>
        <HStack>
            <Text children='Name' fontWeight={'bold'}/>
            <Text children={user.name}/>
        </HStack>
        <HStack>
            <Text children='Email' fontWeight={'bold'}/>
            <Text children={user.email}/>
        </HStack>

       {user.role!=='admin' && 
       <HStack>
            <Text children='Subscription' fontWeight={'bold'} />
            {user.subscription && user.subscription.status==='active' ? (
                <Text  colorScheme='cyan' variant={'ghost'} children='Subscribed' />
            ):(
                <Link to='/subscribe'>
                <Button colorScheme='cyan' >Subscribe</Button>
            </Link>
            ) }
       </HStack>
       }

       <Stack  
       direction={['column','row']}
       alignItems={'center'}
       >
        <Link to='/updateprofile'>
            <Button>Update Profile</Button>
        </Link>

        <Link to='/changepassword'>
            <Button>Change Password</Button>
        </Link>

       </Stack>
       </VStack>
        </Stack>

        <Heading children={'playlist'} size={'md'} my={'8'} />
{
    user.playlist.length> 0 && (
        <Stack direction={['column','row']} alignItems={'center'} flexWrap={'wrap'} p={'4'} >

           {user.playlist.map((element,index)=>(
            <VStack w={'48'} m={'2'} key={element.course}>
                <Image boxSize={'full'} objectFit={'contain'} src={element.poster} />
            <HStack>
                <Link to={`/project/${element.course}`}>
                    <Button variant={'ghost'} colorScheme='yellow'>View Now</Button>
                </Link>
            </HStack>
            </VStack>
           ))} 
        </Stack>
    )
}


        <ChangePhotoBox changeImageSubmitHandler={changeImageSubmitHandler} isOpen={isOpen} onClose={onClose} /> 
    </Container>
  )
}

export default Profile

function ChangePhotoBox({isOpen,onClose,changeImageSubmitHandler}){

    const[image,setImage]=useState('')
    const[imagePrev,setImagePrev]=useState('')

    const changeImage =(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader()
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
          setImagePrev(reader.result)
          setImage(file)
        }
      }

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay  backdropFilter={'blur(10px)'}/>
            <ModalContent>
                <ModalCloseButton/>
                <ModalBody>
                    <Container>
                        <form onSubmit={e=>changeImageSubmitHandler(e,image)} > 
                            <VStack spacing={'8'}>
                               {
                                imagePrev &&  <Avatar src={imagePrev} boxSize={'32'}/>
                               }
                                <Input type={'file'} css={{"&::file-selector-button":fileUploadCss}}
                                onChange={changeImage}
                                />
                            <Button w={'full'} type='submit'>Change</Button>
                            </VStack>
                        </form>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button mr={'3'} onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}