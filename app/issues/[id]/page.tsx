import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import DetailsPage from './DetailsPage'
import EditButton from './EditButton'

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
    <Grid columns={{initial:"1" , md:"2"}} gap="5">
      <Box>
        <DetailsPage issue={issue}/>
        </Box>
        
        <Box>
          <EditButton issueId={issue.id}/>
        </Box>
    </Grid>
  )
}

export default IssueView