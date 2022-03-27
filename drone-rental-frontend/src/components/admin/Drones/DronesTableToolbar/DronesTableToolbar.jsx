import * as React from 'react';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDrones } from '../../../../app/slices/dronesSlice';

function DronesTableToolbar({ numSelected, selectedIds }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteDrones(selectedIds));
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected ? (
        <Typography flex="1 1 100%" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography flex="1 1 100%" variant="h6">
          Drones
        </Typography>
      )}

      {numSelected ? (
        <Tooltip title="Eliminar">
          <IconButton>
            <DeleteIcon onClick={handleDelete} />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Button
            component={Link}
            to="/admin/crear-dron"
            variant="contained"
            color="secondary"
          >
            Crear
          </Button>
          <Tooltip title="Filtrar">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}

DronesTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DronesTableToolbar;
