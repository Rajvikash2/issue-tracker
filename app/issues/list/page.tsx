import IssuesStatusBadge from '@/app/components/IssuesStatusBadge';
import Link from '@/app/components/Link';
import NextLink from 'next/link';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueAction from './IssueAction';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props{
  searchParams : {status : Status, orderBy:keyof Issue}
}

const columns : {label:string,value: keyof Issue,className?:string}[] = [
  {label:'Issue' , value:'title'},
  {label:'Status' , value:'status',className:'hidden md:table-cell'},
  {label:'Created' , value:'createdAt',className:'hidden md:table-cell'}

]

const Issues = async ({searchParams} : Props) => {
 const statuses = Object.values(Status)
 const status  = statuses.includes(searchParams.status) ? searchParams.status:undefined;
 const issues = await prisma.issue.findMany({
  where: {
    ...(status && { status }), // conditionally apply the status filter
  },
  orderBy: searchParams.orderBy ? { [searchParams.orderBy]: 'asc' } : undefined, // dynamically set orderBy based on searchParams
});

  return (
   <div className='max-w-7xl'>  
   <IssueAction />
   <Table.Root variant='surface' >
    <Table.Header>
      <Table.Row>
        {columns.map((col)=>
        <Table.ColumnHeaderCell key={col.value}>
          <NextLink href={{
            query:{...searchParams, orderBy: col.value}
          }}>{col.label}</NextLink>
          {col.value===searchParams.orderBy && <ArrowUpIcon className='inline'/>}
          </Table.ColumnHeaderCell>
        )}
       
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
export const dynamic = 'force-dynamic';
export default Issues