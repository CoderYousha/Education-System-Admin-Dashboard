import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Box, Typography } from "@mui/material";

const data = [
  { value: 60, label: 'شراء دورة 60%' },
  { value: 20, label: 'شحن محفظة 20%' },
  { value: 20, label: 'سحب أرباح 20%' },
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

function PieCenterLabelReports({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel({counts, values, labels}) {
  // var totalCount = 0;
  
  // var useData = labels.map((label, index) => ({ value: values[index], label: label }));

  // counts.map((count, index) =>
  //   totalCount += count
  // )
  
  return (
    <Box className="flex justify-center items-center p-5">
    <PieChart className='mx-auto' sx={{flexDirection: 'column-reverse !important', alignItems: 'start'}} series={[{ data: data, innerRadius: 80, }]} {...size}>
      <PieCenterLabelReports>
          100%
      </PieCenterLabelReports>
    </PieChart>
     </Box>
  );
}