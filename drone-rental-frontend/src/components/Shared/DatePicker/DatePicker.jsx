import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import { Box } from '@mui/material';
import './DatePicker.scss';

function DatePicker({ setDates }) {
  const [value, setValue] = useState([new Date(), new Date()]);
  const handleChange = dateRange => {
    setValue(dateRange);
    setDates(dateRange);
  };

  return (
    <Box>
      <DateRangePicker
        onChange={handleChange}
        value={value}
        minDate={new Date()}
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

DatePicker.propTypes = {
  setDates: PropTypes.func,
};

DatePicker.defaultProps = {
  setDates: () => {},
};
export default DatePicker;
