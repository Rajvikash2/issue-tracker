import React from 'react'
import { Table} from '@radix-ui/themes'
import Link from '../components/Link'
import prisma from '@/prisma/client'
import IssuesStatusBadge from '../components/IssuesStatusBadge'
import delay from 'delay'
import IssueAction from './IssueAction'
const Issues = async () => {
 const issues = await prisma.issue.findMany();
 await delay(2000);
  return (
   <div className='max-w-7xl'>  
   <IssueAction/>
   <Table.Root variant='surface' >
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {issues.map(issue=>(
        <Table.Row key={issue.id}>
         <Table.Cell>
          <Link href={`/issues/${issue.id}`} >
            {issue.title}
          </Link>
            <div className='block md:hidden'><IssuesStatusBadge status={issue.status} /></div>
            </Table.Cell>
        
          <Table.Cell className='hidden md:table-cell'><IssuesStatusBadge status={issue.status} /></Table.Cell>
          <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
   </Table.Root>
  
   </div>
  )
}

export default Issues