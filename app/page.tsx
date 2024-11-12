import Image from 'next/image'
import Pagination from './components/Pagination'
import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client'
import IssueChart from './IssueChart'
import { Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'

export default async function Home() {
  const openCount = await prisma.issue.count({where:{status:'OPEN'}});
  const inProgressCount = await prisma.issue.count({where:{status:'IN_PROGRESS'}});
  const ClosedCount = await prisma.issue.count({where:{status:'CLOSED'}});
  return (
   <Grid columns={{initial:'1',md:'2'}} gap='5'>
    <Flex direction='column' gap='5'>
      <IssueSummary open={openCount} closed={ClosedCount} inProgress={inProgressCount} />
    <IssueChart open={openCount} closed={ClosedCount} inProgress={inProgressCount}/>
    </Flex>
    <LatestIssues />
   </Grid>
  )
}

export const metadata:Metadata={
  title:'Issue Tracker - Dashboard',
  description:'View the lsit of issues summary',
};