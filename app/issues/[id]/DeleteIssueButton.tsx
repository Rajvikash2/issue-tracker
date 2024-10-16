'use client'
import Spinner from '@/app/components/Spinner'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ({issueId}:{issueId:number}) => {
    const router = useRouter();
    const [error,setError] = useState(false);
    const [isDeleting, setDelete] = useState(false);
    const deleteIssue = async()=>{
        try {   
            setDelete(true);         
            await axios.delete('/api/issues/'+issueId)
            router.push('/issues');
            router.refresh();                        
        } catch (error) {
            setDelete(false);
            setError(true);
        }
    }
  return (
    <div>
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button color='red' disabled={isDeleting}>
                Delete Issue
            {isDeleting && <Spinner/>}
            </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description>   
            Are you sure want to delete this issue? This action cannot be reverted!
            </AlertDialog.Description>
            <Flex mt="4" gap="4">
            <AlertDialog.Cancel>
                <Button variant='soft' color='gray'>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
                <Button color='red' onClick={deleteIssue}>Delete</Button>
            </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
        <AlertDialog.Content>
            <AlertDialog.Title>Error !</AlertDialog.Title>
            <AlertDialog.Description>
                Something went wrong. Please try again later.
            </AlertDialog.Description>
            <Button color='gray' variant='soft' mt='3' onClick={()=> setError(false)}>close</Button>
        </AlertDialog.Content>
    </AlertDialog.Root>
    </div>
  
  )
}

export default DeleteIssueButton