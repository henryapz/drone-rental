import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Input,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDrone, uploadDroneImage } from '../../../app/slices/dronesSlice';
import UploadImage from '../../../assets/images/img_ph.svg';

function CreateDron() {
  const [category, setCategory] = useState('aventura');
  const [displayImg, setDisplayImg] = useState(UploadImage);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    model: '',
    brand: '',
    description: '',
    quantity: 0,
    pricePerDay: 0,
    pricePerWeek: 0,
    pricePerMonth: 0,
    productImage: '',
    category_id: '',
  });
  const categories = useSelector(state => state.categories.data);
  const newDrone = useSelector(state => state.drones.newDrone);
  const dispatch = useDispatch();

  const handleChange = (e, field) => {
    const numericFields = ['quantity', 'pricePerDay', 'pricePerWeek', 'pricePerMonth'];
    let value;
    if (numericFields.includes(field)) {
      value = Number(e.target.value);
    } else {
      value = e.target.value;
    }
    setPayload({ ...payload, [field]: value });
  };

  const handleSelect = e => {
    const { value } = e.target;
    setCategory(value);
    setPayload({ ...payload, category_id: value });
  };

  const handleSubmit = () => {
    dispatch(createDrone(payload));
  };

  const handleImageLoad = e => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(
        uploadDroneImage({ model: payload.model, base64EncodedImage: reader.result }),
      );
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
    };
  };

  useEffect(() => {
    if (newDrone.status === 'loading') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [newDrone.status]);

  useEffect(() => {
    if (newDrone.imageUrl) {
      setDisplayImg(newDrone.imageUrl);
    }
  }, [newDrone.imageUrl]);

  useEffect(() => {
    setPayload({ ...payload, productImage: newDrone.imageId });
  }, [newDrone.imageId]);
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
      <Grid container spacing={2} style={styles.mainContainer}>
        <Grid item xs={12} sm={6}>
          <Grid container>
            <Grid item xs={12} margin="3rem 0">
              {isLoading ? (
                <div>...loading</div>
              ) : (
                <img src={displayImg} alt="upload" style={styles.mainImage} />
              )}
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Grid item xs={12} style={{ display: 'flex' }} justifyContent="center">
              <Input type="file" onChange={handleImageLoad} />
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
              onChange={e => handleChange(e, 'model')}
            />
            <TextField
              id="outlined-basic"
              label="Marca"
              variant="outlined"
              margin="dense"
              onChange={e => handleChange(e, 'brand')}
            />
            <TextField
              id="outlined-basic"
              label="Cantidad"
              variant="outlined"
              margin="dense"
              onChange={e => handleChange(e, 'quantity')}
            />
            <Select label="Categoría" value={category} onChange={handleSelect}>
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
              onChange={e => handleChange(e, 'description')}
            />
            <Typography variant="h5">Costo</Typography>
            <TextField
              id="outlined-basic"
              label="Diario"
              variant="outlined"
              margin="dense"
              onChange={e => handleChange(e, 'pricePerDay')}
            />
            <TextField
              id="outlined-basic"
              label="Semanal"
              variant="outlined"
              margin="dense"
              fullWidth={false}
              onChange={e => handleChange(e, 'pricePerWeek')}
            />
            <TextField
              id="outlined-basic"
              label="Mensual"
              variant="outlined"
              margin="dense"
              fullWidth={false}
              onChange={e => handleChange(e, 'pricePerMonth')}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Crear
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateDron;
