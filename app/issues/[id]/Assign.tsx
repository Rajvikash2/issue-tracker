'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 1000 * 60, // 60s
    retry: 3
  });
  
  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssue = (userId : string) => {
    const assignedToUserId = userId === 'none' ? null : userId;
    axios.patch('/api/issues/' + issue.id, { assignedToUserId })
    .catch(()=> {
      toast.error('Something went wrong')});
  }

  return (
    <div>
    <Select.Root 
    defaultValue={issue.assignedToUserId || ""}
    onValueChange={assignIssue}>
      <Select.Trigger placeholder='Assign ...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="none">Unassign</Select.Item>
          {users?.map(user => (
            <Select.Item key={user.id} value={user.id}> {user.name} </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
    <Toaster />
    </div>
  );
}

export default AssigneeSelect;
