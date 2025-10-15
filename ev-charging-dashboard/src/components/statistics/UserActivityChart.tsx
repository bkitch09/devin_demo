import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserStatistics } from '../../types/statistics';

interface UserActivityChartProps {
  data: UserStatistics;
}

export const UserActivityChart: React.FC<UserActivityChartProps> = ({ data }) => {
  const chartData = data.userActivity.map(point => ({
    date: new Date(point.timestamp).toLocaleDateString(),
    users: point.value,
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          User Activity
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Active Users', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="users" fill="#9c27b0" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
