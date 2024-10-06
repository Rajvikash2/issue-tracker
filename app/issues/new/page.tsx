

import { TextArea, TextField, Button } from '@radix-ui/themes'
import React from 'react'

const newIssue = () => {
  return (
    <div className='max-w-xl space-y-2'>
        <TextField.Root placeholder='Title'>
        </TextField.Root>
        <TextArea placeholder="Description" />
        <Button> Submit Issue </Button>
    </div>
  )
}

export default newIssue