import IssuesStatusBadge from '@/app/components/IssuesStatusBadge'
import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactMarkdown from 'react-markdown'

const LoadingIssueDetail = () => {
  return (
    <Box className='max-w-xl'>
        <Skeleton/>
        <Flex gap='3' my="3">
        <Skeleton width='3rem' />
        <Skeleton width='8rem' />
        </Flex>
        <Card className='prose' variant="surface" mt='4'>            
       <Skeleton count={3} />
        </Card>
    </Box>
  )
}

export default LoadingIssueDetail