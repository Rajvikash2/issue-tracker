'use client';

import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"

const newIssue = () => {
  return (
    <div className='max-w-xl space-y-2'>
        <TextField.Root placeholder='Title'>
        </TextField.Root>
        <SimpleMDE placeholder="Description" />
        <Button> Submit Issue </Button>
    </div>
  )
}

export default newIssue