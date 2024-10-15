import IssuesStatusBadge from '@/app/components/IssuesStatusBadge'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const DetailsPage = ({issue}:{issue : Issue}) => {
  return (
    <div>
        <Heading >{issue.title}</Heading>
        <Flex gap='3' my="3">
        <IssuesStatusBadge status={issue.status}/>
        <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose max-w-full' variant="surface" mt='4'>            
        <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </div>
  )
}

export default DetailsPage