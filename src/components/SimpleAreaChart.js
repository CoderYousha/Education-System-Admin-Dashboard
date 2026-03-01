import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useConstants } from '../hooks/UseConstants';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

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

// console.log(allMonths);


export default function SimpleAreaChart({ values, months, monthlyChart }) {
  const intl = useIntl();
  
  const allMonths = [
    intl.formatMessage({ id: 'jan' }),
    intl.formatMessage({ id: 'feb' }),
    intl.formatMessage({ id: 'mar' }),
    intl.formatMessage({ id: 'apr' }),
    intl.formatMessage({ id: 'may' }),
    intl.formatMessage({ id: 'jun' }), 
    intl.formatMessage({ id: 'jul' }), 
    intl.formatMessage({ id: 'aug' }), 
    intl.formatMessage({ id: 'sep' }), 
    intl.formatMessage({ id: 'oct' }), 
    intl.formatMessage({ id: 'nov' }), 
    intl.formatMessage({ id: 'dec' }),
  ];

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
