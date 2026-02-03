import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Box, Typography } from "@mui/material";

const data = [
  { value: 40, label: 'الهندسة المعلوماتية 40%' },
  { value: 20, label: 'إدارة الأعمال 20%' },
  { value: 15, label: 'اللغة العربية 15%' },
  { value: 25, label: 'الهندسة الكهربائية 25%' },
];

const size = {
  width: 200,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel({counts, values, labels}) {
  // var useData = [{}];
  var totalCount = 0;
  
  // labels.map((label, index) => 
  //   useData = [{value: values[index], label: label}]
  // );
  var useData = labels.map((label, index) => ({ value: values[index], label: label }));

  counts.map((count, index) =>
    totalCount += count
  )
  
  return (
    <Box className="flex justify-center items-center p-5">
    <PieChart className='mx-auto' sx={{flexDirection: 'column-reverse !important', alignItems: 'start'}} series={[{ data: useData, innerRadius: 80, }]} {...size}>
      <PieCenterLabel>
          {totalCount} دورات
      </PieCenterLabel>
    </PieChart>
     </Box>
  );
}