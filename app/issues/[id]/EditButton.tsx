import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EditButton = ({issueId}:{issueId:number}) => {
  return (
    <div>
        <Button>
            <Pencil1Icon/>
            <Link href={`/issues/${issueId}/edit`}>
            Edit issue
            </Link>
        </Button>

    </div>
  )
}

export default EditButton