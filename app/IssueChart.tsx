'use client';
import { Card } from '@radix-ui/themes';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import React from 'react';

interface Props {
    open: number;
    closed: number;
    inProgress: number;
}

const IssueChart = ({ open, closed, inProgress }: Props) => {
    const data = [
        { label: 'Open', value: open },
        { label: 'In-Progress', value: inProgress },
        { label: 'Closed', value: closed },
    ];

    return (
        <Card>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='value' barSize={60} fill='#FFDF00' />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default IssueChart;
