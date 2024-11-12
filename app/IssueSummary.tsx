import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props{
    open:number,
    closed:number,
    inProgress:number
}

const IssueSummary = ({open,closed,inProgress}:Props) => {
    const statuses:{
        label:string,
        value:number,
        status:Status

    }[] = [
        {label:'Open issues',value:open, status:'OPEN'},
        {label:'In-Progress issues',value:inProgress, status:'IN_PROGRESS'},
        {label:'Closed issues',value:closed, status:'CLOSED'},
    ]
  return (
    <Flex gap='3'>
        {statuses.map(stat =>(
            <Card key={stat.label}>
                <Flex direction='column' gap='1'>
                    <Link className='font-medium text-sm'
                    href={`/issues/list?status=${stat.status}`}>
                    {stat.label}
                    </Link>
                    <Text size='5' className='font-bold'>{stat.value}</Text>
                </Flex>

            </Card>
        ))}
    </Flex>
  )
}

export default IssueSummary