import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DronesTableHead from '../DronesTableHead/DronesTableHead';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function DronesTable({ page, rowsPerPage, selected, onSelect, onSelectAll }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('model');
  const drones = useSelector(state => state.drones.allDrones);
  const dronesList = drones ?? [];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const dataLength = dronesList?.length ?? 1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataLength) : 0;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }}>
        <DronesTableHead
          numSelected={selected?.length ?? 1}
          order={order}
          orderBy={orderBy}
          onSelectAll={onSelectAll}
          onRequestSort={handleRequestSort}
          rowCount={dronesList?.length ?? 1}
        />
        <TableBody>
          {dronesList
            .slice()
            .sort(getComparator(order, orderBy))
            .map(drone => {
              const isItemSelected = isSelected(drone.model);
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={drone.model}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onChange={event => onSelect(event, drone.model, drone._id)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    {drone.model}
                  </TableCell>
                  <TableCell align="right">{drone.category}</TableCell>
                  <TableCell align="right">{drone.quantity}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary">
                      <ModeEditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DronesTable.propTypes = {
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.instanceOf(Array).isRequired,
  onSelect: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
};

export default DronesTable;
