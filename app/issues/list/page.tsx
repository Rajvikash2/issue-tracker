import IssuesStatusBadge from '@/app/components/IssuesStatusBadge';
import Link from '@/app/components/Link';
import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import IssueAction from './IssueAction';

interface Props{
  searchParams : {
    status : Status, 
    orderBy:keyof Issue,
    page:string
  }
}

const columns : {label:string,value: keyof Issue,className?:string}[] = [
  {label:'Issue' , value:'title'},
  {label:'Status' , value:'status',className:'hidden md:table-cell'},
  {label:'Created' , value:'createdAt',className:'hidden md:table-cell'}

]

const Issues = async ({searchParams} : Props) => {
 const statuses = Object.values(Status)
 const status  = statuses.includes(searchParams.status) ? searchParams.status:undefined;

 // condition for filtering issues based on status saved in a const to use it repeatedly
 const where = {status};

 const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

 const issues = await prisma.issue.findMany({
  where,
  orderBy: searchParams.orderBy ? { [searchParams.orderBy]: 'asc' } : undefined, // dynamically set orderBy based on searchParams
  skip:(page - 1) * pageSize,
  take:pageSize,
});

const issueCount = await prisma.issue.count({where});

  return (
   <div className='max-w-7xl'>  
   <IssueAction />
   <Table.Root variant='surface' >
    <Table.Header>
      <Table.Row>
        {columns.map((col)=>
        <Table.ColumnHeaderCell key={col.value} className={col.className}>
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
   <div className='flex justify-center mt-5'>
   <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
   </div>
   </div>
  )
}
export const dynamic = 'force-dynamic';
export default Issues