import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import { Box } from '@mui/material';
import './DatePicker.scss';

function DatePicker() {
  const [value, onChange] = useState([new Date(), new Date()]);

  return (
    <Box>
      <DateRangePicker
        onChange={onChange}
        value={value}
        rangeDivider="to"
        dayPlaceholder="dd"
        monthPlaceholder="mm"
        yearPlaceholder="yyyy"
        calendarAriaLabel="toggle"
        showLeadingZeros
      />
    </Box>
  );
}

export default DatePicker;
