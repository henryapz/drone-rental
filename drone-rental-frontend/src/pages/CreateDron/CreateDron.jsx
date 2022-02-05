import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UploadImage from '../../assets/images/img_ph.svg';
import categories from '../../services/mock/categories';

function CreateDron() {
  const styles = {
    mainContainer: {
      margin: '2rem 0',
    },
    mainImage: {
      width: '100%',
      height: '100%',
      cursor: 'pointer',
    },
    img: {
      width: 'auto',
      height: 'auto',
      cursor: 'pointer',
    },
  };
  return (
    <Container fixed>
      <Grid container style={styles.mainContainer}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img src={UploadImage} alt="upload" style={styles.mainImage} />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <img src={UploadImage} alt="upload" style={styles.img} />
            </Grid>
            <Grid item xs={4}>
              <img src={UploadImage} alt="upload" style={styles.img} />
            </Grid>
            <Grid item xs={4} style={{ display: 'flex' }} justifyContent="center">
              <AddCircleIcon fontSize="large" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Typography variant="h4">Crear Drone</Typography>
            <TextField
              id="outlined-basic"
              label="Modelo"
              variant="outlined"
              margin="dense"
            />
            <TextField
              id="outlined-basic"
              label="Cantidad"
              variant="outlined"
              margin="dense"
            />
            <Select label="Categoría" value="Agrícola">
              {categories.map(elem => (
                <MenuItem value={elem.name} key={elem.name}>
                  {elem.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              id="outlined-basic"
              label="Descripción"
              multiline
              rows={4}
              margin="dense"
            />
            <Typography variant="h5">Costo</Typography>
            <TextField
              id="outlined-basic"
              label="Diario"
              variant="outlined"
              margin="dense"
            />
            <TextField
              id="outlined-basic"
              label="Semanal"
              variant="outlined"
              margin="dense"
              fullWidth={false}
            />
            <TextField
              id="outlined-basic"
              label="Mensual"
              variant="outlined"
              margin="dense"
              fullWidth={false}
            />
            <Button variant="contained">Crear</Button>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateDron;
