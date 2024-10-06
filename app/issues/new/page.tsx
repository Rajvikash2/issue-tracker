'use client';
import { useForm, Controller} from "react-hook-form"
import { TextField, Button, Callout } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface Issue{
  title: string;
  description: string;
}

const newIssue = () => {
  const{ register, control , handleSubmit } = useForm<Issue>();
  const [error,setError] = useState('');
  const router = useRouter();
  return (
   <div className="max-w-xl">
    {error && <Callout.Root color="red" className="mb-5">
	<Callout.Text>
		{error}
	</Callout.Text>
</Callout.Root>
}
    <form className=' space-y-2' onSubmit={handleSubmit(async (data)=> 
      {
        try {
          await axios.post('/api/issues',data);
          router.push('/issues');
          
        } catch (error) {
        setError('An Unexpected error occured');
      }
    })}>
        <TextField.Root placeholder='Title' {...register('title')}>
        </TextField.Root>
        <Controller 
        name="description"
        control={control}
        render={({field})=><SimpleMDE placeholder="Description" {...field} /> }
        />
        
        <Button> Submit Issue </Button>
    </form>
      </div>
  )
}

export default newIssue