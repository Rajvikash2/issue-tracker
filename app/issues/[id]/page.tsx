import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import DetailsPage from './DetailsPage'
import EditButton from './EditButton'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import AuthOptions from '@/app/auth/AuthOptions'
import AssigneeSelect from './Assign'
import { cache } from 'react'

interface Props{
    params : {id :string}
}

// used for cahiing the data so the when the second call is called the cached data is returned
// reduced the work of the database

const fetchUser= cache((issueId : number)=>{
  return prisma.issue.findUnique({
    where:{id:issueId}
  })
})

const IssueView = async ({params} : Props ) => {
     const session=await getServerSession(AuthOptions);
  const issue = await fetchUser(parseInt(params.id));
    if(!issue)  
        notFound();
  
  return (
    <Grid columns={{initial:"1" , sm:"5"}} gap="5">
      <Box className='md:col-span-4'>
        <DetailsPage issue={issue}/>
        </Box>
        
       { session && 
         <Box>          
          <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue}/>
          <EditButton issueId={issue.id}/>
          <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
}
    </Grid>
  )
}
export async function generateMetadata({params}:Props){
  const issue = await fetchUser(parseInt(params.id));
  return{
    title:issue?.title,
    description:issue?.description
  }
}
export default IssueView