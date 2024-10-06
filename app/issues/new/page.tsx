'use client';
import { useForm, Controller} from "react-hook-form"
import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"
import axios from "axios";
import { useRouter } from "next/navigation";
interface Issue{
  title: string;
  description: string;
}

const newIssue = () => {
  const{ register, control , handleSubmit } = useForm<Issue>();
  const router = useRouter();
  return (
    <form className='max-w-xl space-y-2' onSubmit={handleSubmit(async (data)=> 
    {
      await axios.post('/api/issues',data);
      router.push('/issues');
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
  )
}

export default newIssue