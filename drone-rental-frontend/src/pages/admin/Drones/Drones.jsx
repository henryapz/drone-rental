import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getAllDrones, resetDeletedDrones } from '../../../app/slices/dronesSlice';
import DronesTableToolbar from '../../../components/admin/Drones/DronesTableToolbar/DronesTableToolbar';
import DronesTable from '../../../components/admin/Drones/DronesTable/DronesTable';

export default function AdminDrones() {
  const [succesOnDelete, setSuccesOnDelete] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dronesList = useSelector(state => state.drones.allDrones);
  const deletedDrones = useSelector(state => state.drones.deletedDrones);
  const dispatch = useDispatch();

  const handleSelectAll = event => {
    if (event.target.checked) {
      const newSelecteds = dronesList?.map(n => n.model);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (event, name, id) => {
    const selectedIndex = selected.indexOf(name);
    const idsIndex = selectedIds.indexOf(id);
    let newSelected = [];
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newSelectedIds = newSelectedIds.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newSelectedIds = newSelectedIds.concat(
        newSelectedIds.slice(0, idsIndex),
        newSelectedIds.slice(idsIndex + 1),
      );
    }

    setSelected(newSelected);
    setSelectedIds(newSelectedIds);
    // setSelectedIds([...selectedIds, id]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (deletedDrones.status === 'fulfilled') {
      setSuccesOnDelete(true);
      setSelected([]);
      setSelectedIds([]);
    }
    dispatch(resetDeletedDrones());
    dispatch(getAllDrones());
  }, [deletedDrones.status, dispatch]);

  return (
    <Box>
      {succesOnDelete && (
        <Snackbar
          open={succesOnDelete}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => setSuccesOnDelete(false)}
        >
          <Alert severity="success">
            <strong>Drone eliminado</strong>
          </Alert>
        </Snackbar>
      )}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DronesTableToolbar
          numSelected={selected?.length ?? 1}
          selectedIds={selectedIds}
        />
        <DronesTable
          page={page}
          rowsPerPage={rowsPerPage}
          selected={selected}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
        />
        <TablePagination
          rowsPerPageOptions={[8]}
          component="div"
          count={dronesList?.length ?? 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
