import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

const margin = { right: 24 };
const uData = [4000, 3000, 2000, 2780, 1890, 2390];
const xLabels = [
  'كانون الثاني',
  'شباط',
  'آذار',
  'نيسان',
  'أيار',
  'حزيران',
];

const allMonths = [
  'كانون الثاني',
  'شباط',
  'آذار',
  'نيسان',
  'أيار',
  'حزيران',
  'تموز',
  'آب',
  'أيلول',
  'تشرين الأول',
  'تشرين الثاني',
  'كانون الأول',
];

export default function SimpleAreaChart({ values, months, monthlyChart }) {

  const xLabels = monthlyChart.map(item => { const monthNumber = parseInt(item.month.split("-")[1], 10); return allMonths[monthNumber - 1]; });
  const seriesData = monthlyChart.map(item => item.total);

  useEffect(() => {
  const xLabels = monthlyChart.map(item => { const monthNumber = parseInt(item.month.split("-")[1], 10); return allMonths[monthNumber - 1]; });
  const seriesData = monthlyChart.map(item => item.total);
  }, [values, months]);


  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <LineChart
        series={[{ data: seriesData, area: true, showMark: false }]}
        xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            display: 'none',
          },
        }}
        margin={margin}
      />
    </Box>
  );
}
