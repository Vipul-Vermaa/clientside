import { Button, Icon, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiDashboardFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'


function LinkButton({url,text}) {
    return(
        <Link to={`/admin/${url}`}> 
        <Button fontSize={'larger'} variant={'ghost'}>
           
            {text}
        </Button>
        </Link>
    )
    }

const Sidebar = () => {
  return (
  <VStack spacing={'8'} 
  p={'16'}
  boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
  > 

  <LinkButton text='Dashboard' url='dashboard'/>
  <LinkButton text='Create Project' url={'createproject'} />
  <LinkButton text='Project' url={'project'} />
  <LinkButton text='Users' url={'users'} />
  </VStack>
  )
}

export default Sidebar