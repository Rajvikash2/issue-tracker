'use client';
import { useForm, Controller} from "react-hook-form"
import { TextField, Button, Callout, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import {z} from 'zod'
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./IssueFormSkeleton";




type IssueForm = z.infer<typeof createIssueSchema> // creates interface based on the schema provided in zod


const IssueForm = ({issue} : {issue?:Issue}) => {
 
  const{ register, control , handleSubmit, formState:{errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error,setError] = useState('');
  const [Issubmitting,setSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data)=> 
    {
      try {
        setSubmitting(true);
        if(issue)
            await axios.patch('/api/issues/'+issue.id,data)
        else
            await axios.post('/api/issues',data);
        router.push('/issues/list');
        router.refresh()
        
      } catch (error) {
      setError('An Unexpected error occured');
      setSubmitting(false);
    }
  })


  return (
   <div className="max-w-xl">
    {error && <Callout.Root color="red" className="mb-5">
	<Callout.Text>
		{error}
	</Callout.Text>
</Callout.Root>
}
    <form className=' space-y-2' onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')}>
        </TextField.Root>
        {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
        <Controller 
        name="description"
        defaultValue={issue?.description}
        control={control}
        render={({field})=><SimpleMDE placeholder="Description" {...field} /> }
        />
        {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
        <Button disabled={Issubmitting}>
         {issue ? 'Edit Issue' : 'Submit New Issue'}{" "}
         {Issubmitting && <Spinner/>} </Button>
    </form>
      </div>
  )
}

export default IssueForm