'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';

const statuses: { label: string, value: Status }[] = [
  
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root onValueChange={(status)=>{
      const query = status ? `?status=${status}` : '';
      router.push('/issues/list'+query)
    }}>
      <Select.Trigger aria-label="Filter by status" placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map(status => (
          <Select.Item
            key={status.label}
            value={status.value }
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;