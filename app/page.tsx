import Image from 'next/image'
import Pagination from './components/Pagination'
import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client'

export default async function Home() {
  const openCount = await prisma.issue.count({where:{status:'OPEN'}});
  const inProgressCount = await prisma.issue.count({where:{status:'IN_PROGRESS'}});
  const ClosedCount = await prisma.issue.count({where:{status:'CLOSED'}});
  return (
   <div>
    {/* <LatestIssues /> */}
    <IssueSummary open={openCount} closed={ClosedCount} inProgress={inProgressCount}/>
   </div>
  )
}
