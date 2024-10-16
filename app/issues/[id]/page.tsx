import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import DetailsPage from './DetailsPage'
import EditButton from './EditButton'
import DeleteIssueButton from './DeleteIssueButton'

interface Props{
    params : {id :string}
}

const IssueView = async ({params} : Props ) => {
    
  const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!issue)  
        notFound();
  
  return (
    <Grid columns={{initial:"1" , sm:"5"}} gap="5">
      <Box className='md:col-span-4'>
        <DetailsPage issue={issue}/>
        </Box>
        
        <Box>
          <Flex direction="column" gap="4">
          <EditButton issueId={issue.id}/>
          <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
    </Grid>
  )
}

export default IssueView