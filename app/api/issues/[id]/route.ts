import AuthOptions from "@/app/auth/AuthOptions";
import { createIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH (request:NextRequest,{params} :{params:{id:string}}){
    const body = await request.json();
    const valid = createIssueSchema.safeParse(body);
    const session = await getServerSession(AuthOptions);
    if(!session)
        return NextResponse.json({},{status:401});
    if(!valid.success){
      return  NextResponse.json(valid.error.format(),{status:400})
    }
    const issue =  await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!issue){
       return NextResponse.json("Invalid issue",{status:404});
    }

  const updatedIssue = await  prisma.issue.update({
        where : {id:issue.id},
        data:{
            title:body.title,
            description:body.description
        }
    })
    return NextResponse.json(updatedIssue);
}

export async function DELETE (request:NextRequest,{params} :{params:{id:string}}){
    const session = await getServerSession(AuthOptions);
    if(!session)
        return NextResponse.json({},{status:401});
    
   const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!issue)
        return NextResponse.json({error:'Invalid issue'},{status:404})
   await prisma.issue.delete({
        where:{id:issue.id}
    })
    return NextResponse.json({message:'Issue deleted successfully'});
}