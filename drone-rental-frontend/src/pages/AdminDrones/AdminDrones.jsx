import * as React from 'react';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import dronesList from '../../services/mock/dronesList';
import DronesTableToolbar from '../../components/AdminDrones/DronesTableToolbar/DronesTableToolbar';
import DronesTable from '../../components/AdminDrones/DronesTable/DronesTable';

export default function AdminDrones() {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAll = event => {
    if (event.target.checked) {
      const newSelecteds = dronesList.map(n => n.model);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DronesTableToolbar numSelected={selected.length} />
        <DronesTable
          page={page}
          rowsPerPage={rowsPerPage}
          selected={selected}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dronesList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
